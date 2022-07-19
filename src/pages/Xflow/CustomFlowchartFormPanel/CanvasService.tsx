import Header from './Header';

const CanvasService = () => {
  return (
    <div style={{ padding: '15px' }}>
      <Header title="主画布" />
    </div>
  );
};

const canvasSchema = () => {
  return {
    tabs: [
      {
        /** Tab的title */
        name: '画布配置',
        groups: [],
      },
    ],
  };
};

export { CanvasService, canvasSchema };
