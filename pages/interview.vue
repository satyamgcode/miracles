<template>
  <div class="pt-2 px-2 pb-1 md:px-[20px] lg:px-[90px] xl:px-[160px] h-full">
    <CommonHeroCardWrapper class="h-full md:max-h-[100%]" color="bg-custom-blue-300" :showBothSideSlanted="false" >
      <div class="pt-6 px-2 md:px-4 pb-20 md:pb-6 h-full flex flex-col">
        <!-- Title Section -->
      <div class="flex items-center gap-2 text-sm px-2 md:px-[20px] lg:px-[90px] xl:px-[100px] cursor-pointer"> 
        <img src="@/assets/images/back.svg" alt="">
        <p class="font-normal text-custom-grey-900">Back</p>
      </div>
        <div class="max-w-[1103px] text-center mx-auto max-md:mb-10">
          <h1 class=" mb-4 text-[1.564rem] leading-[2.4rem]">
            Video Interview Session
          </h1>
          <h1
            class="md:hidden text-[28px] leading-7 md:text-[2rem] md:leading-[2.4rem] mb-8 md:mb-6 text-center"
          >
            Interview <br />
            Session
          </h1>
        </div>

        <!-- Main Content Wrapper with Flex Layout for Vertical Spacing -->
        <div
          class="mx-[15px] lg:mx-[95px] text-center flex-1 flex flex-col md:h-full overflow-hidden"
        >
          <!-- Main Content Flex Row (Questions List and Video Recorder) -->
          <div
            class="flex flex-col-reverse md:flex-row justify-between md:gap-10 flex-1"
          >
            <!-- Questions List and Navigation Buttons Section -->
            <div
              class="w-full md:basis-[559px] flex flex-col h-full overflow-hidden"
            >
              <!-- Questions List Content with Scrollable Area -->
              <div class="flex-1 overflow-y-auto custom-scrollbar">
                <div
                  v-for="(question, index) in questions"
                  :key="question.id"
                  role="button"
                  class="mb-[10px] px-6 py-3 rounded-c-4xl"
                  :class="
                    currentQuestion?.id === question.id
                      ? 'bg-custom-yellow-100'
                      : 'bg-white'
                  "
                  @click="handleCardClick(question)"
                >
                  <div class="flex gap-4">
                    <HomeSectionsCount class="!px-4 !py-4 h-full w-full md:max-w-12 flex items-center justify-center">
                      <div class="flex flex-col justify-center">
                        <span class="text-lg ">0{{ index + 1 }}</span>
                        <img
                          v-if="
                            answeredQuestions.some(
                              (ques) => ques.questionId == question.id
                            )
                          "
                          src="@/assets/images/interview/tick.svg"
                          alt="tick icon"
                          class=" w-6 h-6 mt-[-8px] flex items-center justify-center"
                        />
                      </div>
                    </HomeSectionsCount>
                    <div class="flex w-full gap-2 justify-between">
                      <div class="text-base leading-6 font-medium text-left">
                        {{ question.label }}
                      </div>
                      <div v-if="!question.default" class="relative w-fit">
                        <button
                          class="flex items-start"
                          @click.stop="openActionMenu($event, question)"
                        >
                          <IconsMoreIcon />
                        </button>
                        <div
                          v-if="selectedCardAction?.id === question.id"
                          v-outside-click="handleOutSideClick"
                          class="bg-white p-[10px] shadow-[0px_8px_10px_0px_#00000014] rounded-2xl fixed z-20 flex flex-col"
                          :style="{
                            top: mousePosition.y + 20 + 'px',
                            left: mousePosition.x - 20 + 'px',
                          }"
                        >
                          <button
                            class="font-medium leading-6 px-[6px] w-[87px] h-11 text-left"
                          >
                            Edit
                          </button>
                          <button
                            class="font-medium leading-6 px-[6px] w-[87px] h-11 text-left"
                            @click.stop="deleteQuestion(question)"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <InterviewUserRating
                    v-if="question.questionType === 'rating'"
                    class="mt-4"
                    v-model="rating"
                    :total-rating="10"
                  />
                </div>
              </div>

              <!-- Navigation Buttons Section -->
              <div class="mt-4 mb-10 flex gap-4">
                <CommonBaseButton
                  variant="outlined"
                  class="w-full py-4 px-[1.6rem] text-[0.8rem]"
                  @click="goToPreviousQuestion"
                >
                  Previous
                </CommonBaseButton>
                <CommonBaseButton
                  variant="secondary"
                  class="w-full  py-4 px-[1.6rem] text-[0.8rem]"
                  @click="goToNextQuestion"
                >
                  Next
                </CommonBaseButton>
              </div>
            </div>

            <!-- Video Recorder Section -->
            <div
              class="w-full md:basis-[511.94px] flex flex-col h-full overflow-hidden pb-2"
            >
              <InterviewVideoRecorder
                ref="videoRecorder"
                class=" md:min-h-[unset]"
                :default-url="
                  answeredQuestions.find(
                    (ques) => ques.questionId === currentQuestion.id
                  )?.videoUrl || null
                "
                @on-recording-finished="handleRecordingFinished"
                @on-recording-delete="handleRecordingDelete"
              />
              <div class="md:mt-4 max-sm:mb-[43px]">
                <h1 class="text-base leading-[1.628rem] mb-4">
                  Question {{ getCurrentQuestionIndex() + 1 }} of
                  {{ questions.length }}
                </h1>
                <p class="text-base leading-6 max-md:mt-[unset]">
                  {{ currentQuestion.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons Section with Fixed Height -->
          <div
            class="grid grid-cols-2 md:grid-cols-4 mb-24 md:mb-[unset] gap-4 mt-10 md:mt-0 h-[60px]"
          >
            <div>
              <CommonBaseButton
                class="w-full  py-4 px-[1.6rem] text-[0.8rem]"
                variant="outlined"
                @click="isAddQuestionModalOpen = true"
              >
                Add Question
              </CommonBaseButton>
            </div>
            <div>
              <CommonBaseButton
                variant="outlined"
                class="w-full  py-4 px-[1.6rem] text-[0.8rem]"
                @click="isAddMediaModalOpen = true"
              >
                Add Media
              </CommonBaseButton>
            </div>
            <div v-if="medias.length">
              <CommonBaseButton
                
                variant="outlined"
               class="w-full  py-4 px-[1.6rem] text-[0.8rem]"
                @click="isViewMediaModalOpen = true"
              >
                View Media
              </CommonBaseButton>
            </div>
            <div>
              <CommonBaseButton variant="outlined" class="w-full  py-4 px-[1.6rem] text-[0.8rem]">
                Submit
              </CommonBaseButton>
            </div>
          </div>
        </div>

        <!-- Dialog Modals -->
        <CommonDialog v-model="isAddQuestionModalOpen">
          <CommonDialog v-model="isAddQuestionModalOpen">
      <template #headerIcon>
        <div
          class="h-[72px] w-[72px] border-[12px] border-custom-yellow-100 rounded-full flex justify-center items-center"
        >
          <img
            src="@/assets/images/interview/chat.svg"
            alt="settings outline logo"
          />
        </div>
      </template>
      <div class="pt-[54px] pb-12 md:pt-24 px-4 md:px-12">
        <h1
          class="mb-8 text-[2rem] leading-[2.4rem] md:text-[4rem] md:leading-[4rem]"
        >
          How To Add Question?
        </h1>
        <p
          class="mb-8 leading-5 md:text-lg md:leading-[1.35rem] text-text-tertiary"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          scelerisque faucibus ligula eget auctor. Nam vitae efficitur mi, et
          malesuada mauris.
        </p>
        <form @submit.prevent="addNewQuestion">
          <CommonTextArea
            v-model="question"
            label="Primary Message*"
            placeholder="Please enter your message here as clear as possible..."
            required
          />
          <div class="mt-10">
            <CommonBaseButton
              variant="secondary"
              type="submit"
              class="px-8 py-5"
              >Add Question</CommonBaseButton
            >
          </div>
        </form>
      </div>
    </CommonDialog>
        </CommonDialog>
        <CommonDialog
          class="pt-[40px]"
          v-model="isAddMediaModalOpen"
          position="top"
        >
          <InterviewMediaUploadModal @on-submit="handleMediaUpload"/>
        </CommonDialog>
        <CommonDialog v-model="isViewMediaModalOpen" position="center">
          <InterviewMediaViewModal :medias="medias"/>
        </CommonDialog>
      </div>
    </CommonHeroCardWrapper>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'custom', 
});

type Question = {
  id: number;
  label: string;
  questionType: string;
  default: boolean;
};

type AnsweredQuestion = {
  questionId: number;
  videoUrl: string;
};

const videoRecorder = ref<HTMLElement | null>(null);
const rating = ref(null);
const isAddQuestionModalOpen = ref<boolean>(false);
const isAddMediaModalOpen = ref<boolean>(false);
const isViewMediaModalOpen = ref<boolean>(false);
const question = ref<string>("");

const mousePosition = ref({ x: 0, y: 0 });

const questions = ref<Array<Question>>([
  {
    id: 1,
    label:
      "How do you prioritize tasks when managing multiple projects at once?",
    questionType: "direct",
    default: true,
  },
  {
    id: 2,
    label:
      "Can you describe a challenging situation you faced in your role and how you handled it?",
    questionType: "direct",
    default: true,
  },
  {
    id: 3,
    label:
      "What strategies do you use to stay updated on industry trends and advancements?",
    questionType: "direct",
    default: true,
  },
  {
    id: 4,
    label: "Please rate your experience with the team 1-10.",
    questionType: "rating",
    default: true,
  },
]);

const currentQuestion = ref<Question>(questions.value[0]);
const selectedCardAction = ref<Question | null>(null);
const answeredQuestions = ref<AnsweredQuestion[]>([]);
const medias = ref<File[]>([]);

const openActionMenu = (event: MouseEvent, card: Question) => {
  mousePosition.value.x = event.clientX;
  mousePosition.value.y = event.clientY;
  if (!selectedCardAction.value) {
    selectedCardAction.value = card;
  } else {
    selectedCardAction.value = null;
  }
};

const handleOutSideClick = () => {
  selectedCardAction.value = null;
};

const handleRecordingFinished = (url: string) => {
  answeredQuestions.value.push({
    questionId: currentQuestion.value.id,
    videoUrl: url,
  });
};

const handleRecordingDelete = () => {
  answeredQuestions.value = answeredQuestions.value.filter(
    (answer) => currentQuestion.value.id !== answer.questionId
  );
};

const getCurrentQuestionIndex = () =>
  questions.value.findIndex((ques) => ques.id === currentQuestion.value.id);

const reInitializeCamera = () => {
  const videoUrl =
    answeredQuestions.value.find(
      (ques) => ques.questionId === currentQuestion.value.id
    )?.videoUrl || null;
  if (!videoUrl) {
    // @ts-expect-error ref
    videoRecorder.value?.reInitializeCamera();
  }
};

const handleCardClick = (ques: Question) => {
  currentQuestion.value = ques;
  reInitializeCamera();
};

const goToPreviousQuestion = () => {
  const currentQuestionIndex = getCurrentQuestionIndex();
  if (currentQuestionIndex > 0) {
    currentQuestion.value = questions.value[currentQuestionIndex - 1];
    reInitializeCamera();
  }
};

const goToNextQuestion = () => {
  const currentQuestionIndex = getCurrentQuestionIndex();
  if (currentQuestionIndex < questions.value.length - 1) {
    currentQuestion.value = questions.value[currentQuestionIndex + 1];
    reInitializeCamera();
  }
};

const addNewQuestion = () => {
  questions.value.push({
    id: questions.value.length + 1,
    label: question.value,
    questionType: "direct",
    default: false,
  });

  question.value = "";
  isAddQuestionModalOpen.value = false;
};

const deleteQuestion = (question: Question) => {
  questions.value = questions.value.filter((ques) => ques.id !== question.id);
  selectedCardAction.value = null;
};

const handleMediaUpload = (files: File[]) => {
  medias.value.push(...files);
  isAddMediaModalOpen.value = false;
};
</script>
