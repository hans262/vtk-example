
export default function ZipHttpReader(renderer,renderWindow){
  const vtkVolume = window.vtk.Rendering.Core.vtkVolume
  const actor = vtkVolume.newInstance();
  const vtkVolumeMapper =window.vtk.Rendering.Core.vtkVolumeMapper
  const mapper = vtkVolumeMapper.newInstance();

  mapper.setSampleDistance(0.7);
  actor.setMapper(mapper);

  // create color and opacity transfer functions

  const vtkColorTransferFunction =window.vtk.Rendering.Core.vtkColorTransferFunction
  const ctfun = vtkColorTransferFunction.newInstance();

  ctfun.addRGBPoint(200.0, 0.4, 0.2, 0.0);
  ctfun.addRGBPoint(2000.0, 1.0, 1.0, 1.0);
  const vtkPiecewiseFunction =window.vtk.Common.DataModel.vtkPiecewiseFunction
  const ofun = vtkPiecewiseFunction.newInstance();
  ofun.addPoint(200.0, 0.0);
  ofun.addPoint(1200.0, 0.5);
  ofun.addPoint(3000.0, 0.8);

  actor.getProperty().setRGBTransferFunction(0, ctfun);
  actor.getProperty().setScalarOpacity(0, ofun);
  actor.getProperty().setScalarOpacityUnitDistance(0, 4.5);
  actor.getProperty().setInterpolationTypeToLinear();
  actor.getProperty().setUseGradientOpacity(0, true);
  actor.getProperty().setGradientOpacityMinimumValue(0, 15);
  actor.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
  actor.getProperty().setGradientOpacityMaximumValue(0, 100);
  actor.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);
  actor.getProperty().setShade(true);
  actor.getProperty().setAmbient(0.2);
  actor.getProperty().setDiffuse(0.7);
  actor.getProperty().setSpecular(0.3);
  actor.getProperty().setSpecularPower(8.0);

  const vtkHttpDataSetReader =window.vtk.IO.Core.vtkHttpDataSetReader
  const reader = vtkHttpDataSetReader.newInstance();
  mapper.setInputConnection(reader.getOutputPort());
  
  // 先加载小数据集  分辨率 64x64x91
  reader.setUrl(
    'https://data.kitware.com/api/v1/file/58e79a8b8d777f16d095fcd7/download',
    { fullPath: true, compression: 'zip', loadData: true }
  )
  .then(() => {
    renderer.addVolume(actor);
    renderer.resetCamera();
    renderer.getActiveCamera().zoom(1.5);
    renderer.getActiveCamera().elevation(70);
    renderer.updateLightsGeometryToFollowCamera();
    renderWindow.render();
    // 现在加载 完整数据集 分辨率 256x256x91

    reader.setUrl(
      'https://data.kitware.com/api/v1/file/58e665158d777f16d095fc2e/download',
      { fullPath: true, compression: 'zip', loadData: true }
    )
    .then(() => {
      renderWindow.render();
    })
  })
}