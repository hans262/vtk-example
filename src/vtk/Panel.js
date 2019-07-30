import React from 'react'
import { Checkbox, Icon, Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchActor, removeActor, renderActor } from 'store/vtk/actions'
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const mapstate = ({ vtk }) => ({ vtk })
export default connect(mapstate)(function Panel(props) {
  const { dispatch, vtk } = props
  const { actorCache, selectList } = vtk

  function checkChange(e, v) {
    const { target: { checked } } = e
    const { id, sopIUID } = v
    const actors = actorCache[id]
    if (checked) {
      //直接渲染actor组
      dispatch(renderActor(actors))
      //判断第三部分是否存在
      if (!actors[2]) {
        //加载第三部分，并渲染
        dispatch(fetchActor(sopIUID, id))
      }
    } else {
      //删除图形
      dispatch(removeActor(actors))
    }
  }
  
  return (
    <div style={{ padding: '20px 0 0 20px' }}>
      {selectList.map((v, index) =>
        <div key={index} style={{ margin: '5px 0' }}>
          <Checkbox value={v} onChange={e => checkChange(e, v)}>{v.name}</Checkbox>
          <Spin indicator={antIcon} spinning={v.loading} />
        </div>
      )}
    </div>
  )
})