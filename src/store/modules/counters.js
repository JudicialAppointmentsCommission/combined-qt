import { db } from "@/firebase";
import { firestoreAction } from "vuexfire";

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(async context => {
      const ref = db.collection("counters").where("exercise","==","recorder2019");
      await context.bindFirestoreRef("counters", ref);
    }),
  },
  getters: {
    total: state => {
      return state.counters.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
      }, 0)
    },
    situationalJudgementStart: state => {
      return state.counters.reduce((accumulator, currentValue) => {
        if (currentValue.phase === 'situationalJudgementStart') {
          return accumulator + currentValue.count;
        } else {
          return accumulator;
        }
      }, 0)
    },
    situationalJudgementFinish: state => {
      return state.counters.reduce((accumulator, currentValue) => {
        if (currentValue.phase === 'situationalJudgementFinish') {
          return accumulator + currentValue.count;
        } else {
          return accumulator;
        }
      }, 0)
    },
    criticalAnalysisStart: state => {
      return state.counters.reduce((accumulator, currentValue) => {
        if (currentValue.phase === 'criticalAnalysisStart') {
          return accumulator + currentValue.count;
        } else {
          return accumulator;
        }
      }, 0)
    },
    criticalAnalysisFinish: state => {
      return state.counters.reduce((accumulator, currentValue) => {
        if (currentValue.phase === 'criticalAnalysisFinish') {
          return accumulator + currentValue.count;
        } else {
          return accumulator;
        }
      }, 0)
    }
  },
  state: {
    counters: [],
    expected: 988
  }
};
