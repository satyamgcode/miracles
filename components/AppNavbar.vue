<template>
  <div class="relative md:mx-[20px] lg:mx-[90px] xl:mx-[160px] mx-8">
    <div class="z-40 absolute top-2 md:top-4 left-0 right-0">
      <div class="relative mx-auto md:px-5 xl:pl-[98px] 2xl:px-[74px] h-16 w-full max-w-[1120px] flex justify-between">
        <RouterLink to="/" class="self-end">
          <img src="@/assets/images/logo.svg" alt="app logo" />
        </RouterLink>
        <!-- Desktop view -->
        <div
          class="hidden h-full lg:flex gap-3 items-center self-start"
          v-if="showMenus"
        >
          <div class="flex h-full items-start gap-4">
            <button
              v-if="!showFullSearchBar"
              @click="showFullSearchBar = true"
              class="h-[52px] w-[52px] flex items-center justify-center rounded-full bg-white"
            >
              <img src="@/assets/images/search.svg" alt="search icon" />
            </button>
            <div v-else>
              <CommonSearchBar
                :data="searchResults"
                @on-close="showFullSearchBar = false"
              />
            </div>
            <nav
              v-if="!showFullSearchBar"
              class="flex gap-3  h-full"
            >
              <div
                v-for="tab in tabs"
                :key="tab.label"
                class="leading-4 text-custom-grey-900 font-medium h-full flex items-start justify-center pt-4"
                :class="{
                  'group hover:text-black hover:font-semibold': tab.showMenu,
                }"
              >
                <div
                  class="relative h-full md:text-sm cursor-pointer after:block after:content-[attr(label)] after:opacity-0 after:font-semibold"
                  :label="tab.label"
                  :class="[
                    {
                      'before:content-[\'\'] before:absolute before:w-0 before:h-0 before:border-x-[12px] before:border-x-transparent before:border-b-[12px] before:border-b-white before:top-[80%] before:left-1/2 before:transform before:-translate-x-1/2 before:opacity-0 group-hover:before:opacity-100':
                        tab.showMenu,
                    },
                  ]"
                >
                  {{ tab.label }}
                </div>
                <!-- Mega Menu -->
                <div
                  v-if="tab.showMenu"
                  class="hidden group-hover:block absolute top-[calc(100%-2px)] z-30 inset-x-0 bg-white rounded-3xl p-10"
                >
                  <h1 class="font-medium text-2xl">Featured</h1>
                  <div class="my-5 border border-custom-grey-400" />
                  <div class="flex justify-between" v-if="menus[tab.label]">
                    <div
                      v-for="(menuSection, index) in menus[tab.label]"
                      :key="index"
                    >
                      <ul>
                        <li
                          v-for="menuItem in menuSection"
                          :key="menuItem"
                          class="text-custom-grey-900 font-normal mb-5 leading-6 cursor-pointer"
                        >
                          {{ menuItem }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="mt-5">
                    <CommonBaseButton variant="secondary" class="px-8 py-5"
                      >Read More</CommonBaseButton
                    >
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <CommonBaseButton variant="secondary" class="self-start px-6 py-4">
            Log in
          </CommonBaseButton>
        </div>
        <!-- Mobile view -->
        <button
          v-if="!isModalOpen && showMenus"
          @click="isModalOpen = true"
          class="lg:hidden h-14 w-14 rounded-full bg-custom-grey-500 flex justify-center items-center"
        >
          <img src="@/assets/images/menu.svg" alt="menu icon" />
        </button>
      </div>
    </div>
    <CommonDialog
      position="top"
      background-color="custom-yellow-100"
      v-model="isModalOpen"
    >
      <div class="flex flex-col w-full justify-between pt-10 pb-4 px-4 min-h-[613px]">
        <ul>
          <li
            class="font-medium text-2xl leading-[1.8rem] mb-6 pb-6 border-b border-custom-grey-400"
          >
            Home
          </li>
          <li v-for="tab in tabs" :key="tab.label" @click="setSelectedTab(tab)">
            <div
              v-if="!selectedTab || selectedTab === tab.label"
              class="font-medium text-2xl leading-[1.8rem] mb-6 pb-6 border-b border-custom-grey-400"
            >
              <span>{{ tab.label }}</span>
              <ul
                v-if="selectedTab === tab.label && menus[tab.label]"
                class="h-[288px] mt-6 overflow-y-scroll"
              >
                <li
                  v-for="menuItem in menus[tab.label].flat()"
                  :key="menuItem"
                  class="text-base leading-6 mb-5"
                >
                  {{ menuItem }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <CommonBaseButton variant="secondary" class="px-16 py-8"
          >Log in</CommonBaseButton
        >
      </div>
    </CommonDialog>
  </div>
</template>

<script setup lang="ts">
type Tab = {
  label: string;
  showMenu: boolean;
};

type Menu = {
  [key: string]: string[][];
};

const showFullSearchBar = ref<boolean>(false);
const isModalOpen = ref<boolean>(false);
const screenWidth = ref<number>(typeof window !== 'undefined' ? window.innerWidth : 0);


const tabs: Array<Tab> = [
  {
    label: "Health Sphere",
    showMenu: true,
  },
  {
    label: "Healing Journeys",
    showMenu: true,
  },
  {
    label: "Share a Miracle",
    showMenu: false,
  },
  {
    label: "About Us",
    showMenu: false,
  }
];

const searchResults = [
  "Abdominal Pain",
  "Antibiotics",
  "Arrhythmia",
  "Autoimmune Disorders",
];

const menus: Menu = {
  "Health Sphere": [
    [
      "Breast Cancer",
      "IBD",
      "Migraine",
      "Multiple Sclerosis (MS)",
      "Rheumatoid Arthritis",
      "Type 2 Diabetes",
      "Sponsored Topics",
    ],
    [
      "Acid Reflux",
      "ADHD",
      "Allergies",
      "Alzheimer’s & Dementia",
      "Bipolar Disorder",
      "Cancer",
      "Crohn’s Disease",
    ],
    [
      "Chronic Pain",
      "Cold & Flu",
      "COPD",
      "Depression",
      "Fibromyalgia",
      "Heart Disease",
      "High Cholesterol",
    ],
    [
      "HIV",
      "Hypertension",
      "IPF",
      "Osteoarthritis",
      "Psoriasis",
      "Skin Disorders Care",
      "STDs",
    ],
  ],
  "Healing Journeys": [
    ["Breast Cancer", "IBD", "Migraine"],
    ["Acid Reflux", "ADHD", "Allergies"],
    ["Allergies", "Cold & Flu"],
    ["HIV", "Hypertension"],
  ],
};

const selectedTab = ref<string | null>(null);

const route = useRoute();

const showMenus = computed(() => {
  const hideMenusOn = ["/interview"];

  return !hideMenusOn.includes(route.path);
});

const setSelectedTab = (tab: Tab) => {
  if (tab.showMenu) {
    if (!selectedTab.value) {
      selectedTab.value = tab.label;
    } else {
      selectedTab.value = null;
    }
  }
};

const handleResize = () => {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value > 1024) {
    isModalOpen.value = false;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});


</script>
