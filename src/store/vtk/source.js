import data from './data'
const {
  images,
  currentImageSeries,
  rtstructures,
  currentRTStructurePoints,
  currentRTStructureSopID,
} = data

export function getSelectList() {
  let p = Object.values(rtstructures)
  return p.map(v => ({ ...v, loading: false }))
}

export function color(id) {
  const stru = Object.values(rtstructures).filter(v => v.id === id)[0]
  return stru ? stru.color.map(v => v / 255) : []
}

const dimensions = [512, 512, 113]
const spacing = [1.0429688, 1.0429688, 5]
function generateActor(id) {
  const rtStructureKey = currentRTStructureSopID + '_' + id;

  const contourPointsArray = currentRTStructurePoints[rtStructureKey];
  const rtStructure = rtstructures[rtStructureKey];
  const color = rtStructure.color.map(i => i / 255);

  let i = 0;
  const pts = [];
  const cells = [];
  const sortedImages = currentImageSeries.images.map(imageIUID => images[imageIUID]);
  sortedImages.forEach(image => {
    const z = dimensions[2] - image.number;
    const imageIUID = image.sopUID;
    const linesArray = contourPointsArray[imageIUID];
    linesArray.forEach(lineArray => {
      if (lineArray.length > 0) {
        cells.push(lineArray.length + 1)
        const start = i
        for (let pointArray of lineArray) {
          pts[i * 3 + 0] = pointArray[0]
          pts[i * 3 + 1] = pointArray[1]
          pts[i * 3 + 2] = z
          cells.push(i)
          i++
        }
        cells.push(start)
      }
    })
  })

  //细胞
  const vtkCellArray = window.vtk.Common.Core.vtkCellArray
  const lines = vtkCellArray.newInstance()
  lines.setData(new Uint16Array(cells))
  //点
  const vtkPoints = window.vtk.Common.Core.vtkPoints
  const points = vtkPoints.newInstance()
  points.setNumberOfPoints(pts.length / 3)
  points.setData(pts)


  //组装数据模型
  const vtkPolyData = window.vtk.Common.DataModel.vtkPolyData
  const contours = vtkPolyData.newInstance({ lines, polys: lines, points })

  const vtkMapper = window.vtk.Rendering.Core.vtkMapper
  const contourMapper = vtkMapper.newInstance()
  contourMapper.setInputData(contours)

  const vtkActor = window.vtk.Rendering.Core.vtkActor
  const contourActor = vtkActor.newInstance()
  contourActor.setMapper(contourMapper)

  contourActor.getProperty().setColor(...color)
  contourActor.getProperty().setAmbient(1)
  contourActor.getProperty().setDiffuse(0)
  contourActor.getProperty().setRepresentation(2)
  contourActor.getProperty().setOpacity(0.01)
  contourActor.setScale(...spacing)

  const m = vtkMapper.newInstance()
  const a = vtkActor.newInstance()
  m.setInputData(contours)
  a.setMapper(m)
  a.getProperty().setRepresentation(1)
  a.getProperty().setColor(...color)
  a.getProperty().setOpacity(1)
  a.setScale(...spacing)

  return [contourActor, a]

}

export function actor() {
  const map = {}
  Object.values(rtstructures).forEach(v => {
    map[v.id] = generateActor(v.id)
  })
  return map
}