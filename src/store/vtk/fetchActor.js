import store from 'store'
import { color } from './source'
import {
  cacheActor,
  loadingEnd,
  renderActor
} from './actions'
const spacing = [1.0429688, 1.0429688, 5]

export default function fetchActor(sopIUID, structureID) {
  //修改loading
  const vtkPolyDataReader = window.vtk.IO.Legacy.vtkPolyDataReader
  const reader = vtkPolyDataReader.newInstance()
  //reader.setUrl(`${process.env.REACT_APP_BASE_URL}/rtpacs/structure/reconstruction?sopIUID=${sopIUID}&structureID=${structureID}`)
  reader.setUrl(`/vtk/test.vtk`).then(() => {
    //修改loading
    store.dispatch(loadingEnd(structureID))
    //获取数据
    const polydata = reader.getOutputData(0)
    if (polydata) {
      //创建mapper actor

      const vtkActor = window.vtk.Rendering.Core.vtkActor
      const vtkMapper = window.vtk.Rendering.Core.vtkMapper
      const mapper = vtkMapper.newInstance()
      const actor = vtkActor.newInstance()

      actor.setMapper(mapper)
      mapper.setInputData(polydata)

      //设置actor属性
      actor.getProperty().setColor(...color(structureID))
      actor.getProperty().setAmbient(1)
      actor.getProperty().setDiffuse(0)
      actor.getProperty().setRepresentation(2)
      actor.getProperty().setOpacity(0.5)
      actor.setScale(...spacing)

      //渲染第三部分
      store.dispatch(renderActor(actor))
      //存进缓存
      store.dispatch(cacheActor(structureID, actor))
    } else {
      console.log('数据加载失败')
    }
  })
}