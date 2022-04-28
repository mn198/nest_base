import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class McacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async get(key: string) {
    return JSON.parse(await this.cacheManager.store.get(key))
  }

  async set(key: string, data: any) {
    return await this.cacheManager.store.set(key, JSON.stringify(data))
  }

  async del(key: string) {
    return await this.cacheManager.store.del(key)
  }
}
