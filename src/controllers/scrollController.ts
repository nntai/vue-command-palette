import { ref, Ref, watch } from "vue";
import GroupCommand from "../models/groupCommand";


export default function scrollController(
  groupCommandIndex: Ref<{ groupIndex: number; index: number }>,
  isArrowDown: Ref<boolean>,
  isArrowUp: Ref<boolean>
) {
  const root: Ref<HTMLElement | null> = ref(null);
  const groupRef: Ref<HTMLElement[] | null> = ref(null);
  const groupNameRef: Ref<HTMLElement[] | null> = ref(null);
  const commandRef: Ref<HTMLElement[] | null> = ref(null);

  watch(groupCommandIndex, (value) => {
    if (isArrowDown.value) {
      if (groupRef.value !== null) {
        if (groupRef.value.length !== 0) {
          let totalLength = 0;

          for (let i: number = 0; i < value.groupIndex; i++) {
            totalLength += groupRef.value[i].clientHeight + 10;
          }
          if (groupNameRef.value !== null) {
            totalLength += groupNameRef.value[value.groupIndex].clientHeight;
          }
          for (let i: number = 0; i < value.index + 1; i++) {
            totalLength += commandRef.value![i].clientHeight + 10;
          }
          if (totalLength > root.value!.scrollTop + root.value!.clientHeight) {
            root.value!.scrollTop = totalLength - root.value!.clientHeight;
          }
        }
      }
    }

    if (isArrowUp.value) {
      if (groupRef.value !== null) {
        if (groupRef.value.length !== 0) {
          let totalLength = 0;
          for (let i: number = 0; i < value.groupIndex; i++) {
            totalLength += groupRef.value[i].clientHeight + 10;
          }
          if (groupNameRef.value !== null) {
            totalLength += groupNameRef.value[value.groupIndex].clientHeight;
          }
          for (let i: number = 0; i < value.index; i++) {
            totalLength += commandRef.value![i].clientHeight + 10;
          }
          if (totalLength < root.value!.scrollTop) {
            root.value!.scrollTop = totalLength;
          }
        }
      }
    }
  });

  return {
    root,
    groupRef,
    groupNameRef,
    commandRef,
  };
}
