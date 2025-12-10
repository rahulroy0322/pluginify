import { create } from 'zustand'
import type { SlotNameType, SlotsType } from '@/@types/plugin'
import type { SlotStoreType } from '@/@types/store'

const useSlots = create<SlotStoreType>(() => ({
  slots: {
    'main-header': [],
    dashboard: [],
  },
}))

const { setState: set, getState: get } = useSlots

const addToSlot = (slot: SlotNameType, plugin: SlotsType[SlotNameType][0]) => {
  const slots = get().slots

  if (!(slot in slots)) {
    return
  }

  const existings = slots[slot]

  if (!existings) {
    slots[slot] = []
  }

  if (existings.find(({ id }) => id === plugin.id)) {
    return
  }

  slots[slot] = [...slots[slot], plugin]

  set({
    slots,
  })
}

export { addToSlot, useSlots }
