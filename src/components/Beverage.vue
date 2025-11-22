<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    <Contents>
      <!-- Conditional rendering based on customer selections -->
      <template v-slot:top>
        <!-- Show creamer only if not "No Cream" -->
        <Creamer 
          v-if="hasCreamer"
          :class="{ 'no-gap': !hasSyrup }"
        />
      </template>
      <template v-slot:mid>
        <!-- Show syrup only if not "No Syrup" -->
        <Syrup 
          v-if="hasSyrup"
        />
      </template>
      <template v-slot:bottom>
        <!-- Base beverage is always shown -->
        <Base />
      </template>
    </Contents>
  </Mug>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";
import { useBeverageStore } from "../stores/beverageStore";

type Props = {
  isIced: boolean;
};
defineProps<Props>();

const beverageStore = useBeverageStore();

// Computed properties for conditional rendering logic
const hasCreamer = computed(() => beverageStore.currentCreamer?.name !== "No Creamer");
const hasSyrup = computed(() => beverageStore.currentSyrup?.name !== "No Syrup");
</script>

<style scoped>
/* When there's no syrup, creamer should be directly on top of base beverage */
.no-gap {
  margin-bottom: 0 !important;
  transform: translateY(200%) !important;
}
</style>
