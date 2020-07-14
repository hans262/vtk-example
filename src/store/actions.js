/**
 * 初始化渲染器
 */
export const INIT_RENDERER = 'INIT_RENDERER'
export function initRenderer(renderer, renderWindow) {
  return { type: INIT_RENDERER, renderer, renderWindow }
}

/**
 * 销毁渲染器
 */
export const DESTORY_RENDERER = 'DESTORY_RENDERER'
export function destoryRenderer() {
  return { type: DESTORY_RENDERER }
}

/**
 * 渲染actors
 */
export const RENDER_ACTOR = 'RENDER_ACTOR'
export function renderActor(actors) {
  return { type: RENDER_ACTOR, actors }
}

/**
 * 移除actors
 */
export const REMOVE_ACTOR = 'REMOVE_ACTOR'
export function removeActor(actors) {
  return { type: REMOVE_ACTOR, actors }
}