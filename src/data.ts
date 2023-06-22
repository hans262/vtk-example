import data from "./data.json"

export const DataModel = (data as any[]).map(v => {
  const { spacing, cels, pts, color } = v

  //细胞
  const vtkCellArray = window.vtk.Common.Core.vtkCellArray
  const cellArray = vtkCellArray.newInstance()
  cellArray.setData(new Uint16Array(cels))

  //点
  const vtkPoints = window.vtk.Common.Core.vtkPoints
  const points = vtkPoints.newInstance()
  points.setNumberOfPoints(pts.length / 3)
  points.setData(pts)

  //数据模型
  const vtkPolyData = window.vtk.Common.DataModel.vtkPolyData
  const polyData = vtkPolyData.newInstance({ polys: cellArray, points })

  //api
  const vtkMapper = window.vtk.Rendering.Core.vtkMapper
  const vtkActor = window.vtk.Rendering.Core.vtkActor

  const mapper = vtkMapper.newInstance()
  const actor = vtkActor.newInstance()
  mapper.setInputData(polyData)
  actor.setMapper(mapper)

  actor.getProperty().setRepresentation(1)
  actor.getProperty().setColor(...color)
  actor.getProperty().setOpacity(1)
  actor.setScale(...spacing)

  /**
   * 面的设置方式
   * setAmbient(1)
   * setDiffuse(0)
   * setRepresentation(2)
   * setOpacity(0.05)
   */

  return { ...v, actor: [actor] }
})