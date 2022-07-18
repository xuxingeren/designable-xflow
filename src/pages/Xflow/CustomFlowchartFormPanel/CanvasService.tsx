const CanvasService = () => {
  return <div>主画布</div>;
};

const canvasSchema = () => {
  return {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '',
                name: 'canvas-service',
                shape: 'canvas-service',
              },
            ],
          },
        ],
      },
    ],
  };
};

export { CanvasService, canvasSchema };
