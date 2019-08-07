import React from 'react'
import { Checkbox } from 'antd'
import { connect } from 'react-redux'
import { removeActor, renderActor } from 'store/vtk/actions'

const mapstate = ({ vtk }) => ({ vtk })
export default connect(mapstate)(function Panel(props) {
  const { dispatch, vtk } = props
  const { actorCache, selectList } = vtk

  function checkChange(e, v) {
    const { target: { checked } } = e
    const { id } = v
    const actors = actorCache[id]
    if (checked) {
      //直接渲染actor组
      dispatch(renderActor(actors))
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
        </div>
      )}
    </div>
  )
})