export const paginationQuery = ({ page, size }) => {
  return [
    {
      $facet: {
        data: [{ $skip: (page - 1) * size }, { $limit: size }],
        count: [{ $count: 'totalRecord' }],
      },
    },
    {
      $unwind: {
        path: '$count',
      },
    },
    {
      $project: {
        data: 1,
        total: '$count.totalRecord',
      },
    },
  ];
};
