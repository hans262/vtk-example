const vtkActor = window.vtk.Rendering.Core.vtkActor
const vtkPDBReader = window.vtk.IO.Misc.vtkPDBReader
const vtkSphereMapper = window.vtk.Rendering.Core.vtkSphereMapper
const vtkStickMapper = window.vtk.Rendering.Core.vtkStickMapper
const vtkMoleculeToRepresentation = window.vtk.Filters.General.vtkMoleculeToRepresentation

export default function PDBReader(renderer,renderWindow){
  const reader = vtkPDBReader.newInstance();
  const filter = vtkMoleculeToRepresentation.newInstance();
  const sphereMapper = vtkSphereMapper.newInstance();
  const stickMapper = vtkStickMapper.newInstance();
  const sphereActor = vtkActor.newInstance();
  const stickActor = vtkActor.newInstance();

  filter.setInputConnection(reader.getOutputPort());
  filter.setHideElements(['H']);

  // render sphere
  sphereMapper.setInputConnection(filter.getOutputPort(0));
  sphereMapper.setScaleArray(filter.getSphereScaleArrayName());
  sphereActor.setMapper(sphereMapper);

  // render sticks
  stickMapper.setInputConnection(filter.getOutputPort(1));
  stickMapper.setScaleArray('stickScales');
  stickMapper.setOrientationArray('orientation');
  stickActor.setMapper(stickMapper);

  // reader.setUrl(`${__BASE_PATH__}/data/molecule/pdb/caffeine.pdb`).then(() => {
  reader.setUrl(`http://kitware.github.io/vtk-js/data/molecule/pdb/2LYZ.pdb`).then(() => {
    renderer.resetCamera();
    renderWindow.render();
  });

  renderer.addActor(sphereActor);
  renderer.addActor(stickActor);
  renderer.resetCamera();
  renderWindow.render();
}