export default {
  'GET /api/mechanism': [
    {
      value: '1',
      label: '机构1',
    },
    {
      value: '2',
      label: '机构2',
    },
  ],
  'GET /api/users': (req, res) => {
    // 添加跨域请求头
    const query: any = req.query;
    const user: any = {
      '1': [
        {
          value: '1-1',
          label: '机构1-人员1',
        },
        {
          value: '1-2',
          label: '机构1-人员2',
        },
      ],
      '2': [
        {
          value: '2-1',
          label: '机构2-人员1',
        },
        {
          value: '2-2',
          label: '机构2-人员2',
        },
      ],
    };
    res.send(user[query.id]);
  },
};
