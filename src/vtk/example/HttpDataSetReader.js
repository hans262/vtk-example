const vtkActor = window.vtk.Rendering.Core.vtkActor
const vtkHttpDataSetReader = window.vtk.IO.Core.vtkHttpDataSetReader
const vtkMapper = window.vtk.Rendering.Core.vtkMapper

export default function HttpDataSetReader(renderer,renderWindow){
  const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
  reader.setUrl(`http://kitware.github.io/vtk-js/data/cow.vtp`).then(() => {
    reader.loadData().then(() => {
      renderer.resetCamera();
      renderWindow.render();
    });
  });

  const mapper = vtkMapper.newInstance();
  mapper.setInputConnection(reader.getOutputPort());

  const actor = vtkActor.newInstance();
  actor.setMapper(mapper);

  renderer.addActor(actor);
}