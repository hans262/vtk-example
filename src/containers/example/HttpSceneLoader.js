const vtkHttpSceneLoader = window.vtk.IO.Core.vtkHttpSceneLoader

export default function HttpSceneLoader(renderer,renderWindow){
  const sceneImporter = vtkHttpSceneLoader.newInstance({
    renderer,
    fetchGzip: true,
  });
  sceneImporter.setUrl(`http://kitware.github.io/vtk-js/data/scene`);
  sceneImporter.onReady(() => {
    renderWindow.render();
  });
}