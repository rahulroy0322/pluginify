import type { FC } from 'react'
import type { SlotNameType } from '@/@types/plugin'
import { useSlots } from '@/stores/slot.store'

const PluginSlot: FC<{ slot: SlotNameType; className?: string }> = ({
  slot,
  className,
}) => {
  const components = useSlots((state) => state.slots[slot])

  if (!components || components.length === 0) return null

  return (
    <div className={className}>
      {components.map(({ id, Component }, idx) => (
        <Component key={id || idx} />
      ))}
    </div>
  )
}

export default PluginSlot
