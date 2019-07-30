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

/**
 * 加载actor
 */
export const FETCH_ACTOR = 'FETCH_ACTOR'

export function fetchActor(sopIUID, id) {
  return { type: FETCH_ACTOR, sopIUID, id }
}
/**
 * 缓存actor
 */
export const CACHE_ACTOR = 'CACHE_ACTOR'
export function cacheActor(id, actor) {
  return { type: CACHE_ACTOR, id, actor }
}
/**
 * 结束loading
 */
export const LOADING_END = 'LOADING_END'
export function loadingEnd(id) {
  return { type: LOADING_END, id, loading: false }
}
