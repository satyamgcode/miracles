<template>
  <div class="overflow-x-auto hidden-scrollbar">
    <table class="min-w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="p-6 border-t border-l border-custom-grey-400 bg-custom-blue-200 text-left"
            :class="{
              'rounded-tl-3xl': index === 0,
              'rounded-tr-3xl': index === columns.length - 1,
            }"
          >
            <span class="font-semibold leading-6">{{ column.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="row.id">
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="p-6 border border-custom-grey-400"
            :class="{
              'rounded-bl-3xl': colIndex === 0 && index === data.length - 1,
              'rounded-br-3xl':
                colIndex === columns.length - 1 && index === data.length - 1,
            }"
          >
            <span class="font-medium leading-6">{{
              row[column.dataIndex]
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
type Columns = {
  label: string
  dataIndex: string
}

type Props = {
  columns?: Array<Columns>
  data?: any[]
}

withDefaults(defineProps<Props>(), {
  columns: [],
  data: [],
})
</script>
