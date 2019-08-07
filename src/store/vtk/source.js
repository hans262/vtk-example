import data from './data'
const {
  images,
  currentImageSeries,
  rtstructures,
  currentRTStructurePoints,
  currentRTStructureSopID,
} = data

export const selectList = Object.values(rtstructures)
console.log(data)

// export function color(id) {
//   const stru = Object.values(rtstructures).filter(v => v.id === id)[0]
//   return stru ? stru.color.map(v => v / 255) : []
// }

// const dimensions = [512, 512, 113]
const temp = []
const spacing = [1.0429688, 1.0429688, 5]
function generateActor(id) {
  const rtStructureKey = currentRTStructureSopID + '_' + id

  const contourPointsArray = currentRTStructurePoints[rtStructureKey]
  const rtStructure = rtstructures[rtStructureKey]
  const color = rtStructure.color.map(i => i / 255)

  let i = 0
  const pts = []
  const cels = []
  const sortedImages = currentImageSeries.images.map(imageIUID => images[imageIUID])

  sortedImages.forEach(image => {
    const z = 113 - image.number
    const imageIUID = image.sopUID
    const linesArray = contourPointsArray[imageIUID]
    linesArray.forEach(lineArray => {
      if (lineArray.length > 0) {
        cels.push(lineArray.length + 1)
        const start = i
        for (let pointArray of lineArray) {
          pts[i * 3 + 0] = pointArray[0]
          pts[i * 3 + 1] = pointArray[1]
          pts[i * 3 + 2] = z
          cels.push(i)
          i++
        }
        cels.push(start)
      }
    })
  })

  temp.push({
    id,
    cels,
    pts
  })
  console.log(temp)

  //细胞
  const vtkCellArray = window.vtk.Common.Core.vtkCellArray
  const cellArray = vtkCellArray.newInstance()
  cellArray.setData(new Uint16Array(cels))

  //点
  const vtkPoints = window.vtk.Common.Core.vtkPoints
  const points = vtkPoints.newInstance()
  points.setNumberOfPoints(pts.length / 3)
  points.setData(pts)

  //组装数据模型
  const vtkPolyData = window.vtk.Common.DataModel.vtkPolyData
  const contours = vtkPolyData.newInstance({ cellArray, polys: cellArray, points })


  //api
  const vtkMapper = window.vtk.Rendering.Core.vtkMapper
  const vtkActor = window.vtk.Rendering.Core.vtkActor

  //面
  const surfaceMapper = vtkMapper.newInstance()
  const surfaceActor = vtkActor.newInstance()
  surfaceMapper.setInputData(contours)
  surfaceActor.setMapper(surfaceMapper)
  surfaceActor.getProperty().setColor(...color)
  surfaceActor.getProperty().setAmbient(1)
  surfaceActor.getProperty().setDiffuse(0)
  surfaceActor.getProperty().setRepresentation(2)
  surfaceActor.getProperty().setOpacity(0.05)
  surfaceActor.setScale(...spacing)

  //线
  const m = vtkMapper.newInstance()
  const lineActor = vtkActor.newInstance()
  m.setInputData(contours)
  lineActor.setMapper(m)

  lineActor.getProperty().setRepresentation(1)
  lineActor.getProperty().setColor(...color)
  lineActor.getProperty().setOpacity(1)
  lineActor.setScale(...spacing)

  return [surfaceActor, lineActor]

}

export function actor() {
  const map = {}
  Object.values(rtstructures).forEach(v => {
    map[v.id] = generateActor(v.id)
  })
  return map
}