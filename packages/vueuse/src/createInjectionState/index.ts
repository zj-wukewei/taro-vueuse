import { type InjectionKey, type App, inject, provide } from 'vue'

/**
 * Create global state that can be injected into components.
 *
 * @see https://vueuse.org/createInjectionState
 *
 */
function createInjectionState<Arguments extends Array<any>,Return>(
  composable: (...args: Arguments) => Return
): readonly [useProvidingState: (...args: Arguments) => void, useInjectedState: () => Return | undefined, install: (app: App, ...args: Arguments) => void] {
  const key: string | InjectionKey<Return> = Symbol('InjectionState')
  const useProvidingState = (...args: Arguments) => {
    provide(key, composable(...args))
  }
  const install = (app: App, ...args: Arguments) => {
    app.provide(key, composable(...args));
  }
  const useInjectedState = () => inject(key)
  return [useProvidingState, useInjectedState, install]
}

export default createInjectionState;