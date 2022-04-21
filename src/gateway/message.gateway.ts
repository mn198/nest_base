import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

import { JoinRoomDto } from './dto/join-room.dto';

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  connectedUsers: Map<string, string> = new Map();

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    const token = client.handshake.query.token.toString();
    const payload = this.authService.verifyAccessToken(token);
    const user = payload && (await this.userService.findOne(payload.username));
    const room = { id: '123' };

    if (!user) {
      client.disconnect(true);

      return;
    }

    this.connectedUsers.set(client.id, user.id);

    if (room) {
      return this.onRoomJoin(client, { roomId: room.id });
    }
  }

  async handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, joinRoomDto: JoinRoomDto) {
    const { roomId } = joinRoomDto;
    client.join(roomId);
    client.emit('message', 'join room');
  }

  private getClientByUserId(userId: string): Socket | null {
    for (const [key, value] of this.connectedUsers.entries()) {
      if (value === userId) {
        const kickedClient = this.server.sockets.sockets.get(key);

        return kickedClient;
      }
    }

    return null;
  }
}
