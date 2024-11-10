import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HabitDataSchema, initialState } from "./common";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const fetchHabitsList = createAsyncThunk(
  "habits/fetchHabitsList",
  async (userId: string, thunkAPI) => {
    try {
      const habitRef = collection(db, `users/${userId}/habits`);
      const habitSnapShot = await getDocs(habitRef);

      const habitArr: HabitDataSchema[] = [];
      habitSnapShot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        const newHabitObj = {
          id: data.id,
          color: data.color || "",
          longestStreak: data.longestStreak || false,
          streak: data.streak || false,
          title: data.title || "",
          total: data.total || false,
          type: data.type || "",
          unit: data.unit || "",
          value: data.value || [],
        };
        habitArr.push(newHabitObj);
      });

      // TO SORT WHICH EVER HABIT YOU USE DAILY TO BE ON THE TOP
      habitArr.sort((a, b) => (b.value.length || 0) - (a.value.length || 0));

      return habitArr;
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "something went wrong";
      thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, { payload }) => {
      if (payload) {
        if (state.data === null) {
          state.data = [payload];
        } else {
          state.data.push(payload);
        }
      }
    },
    updateValue: (state, { payload }) => {
      const { habitId, day, value } = payload;

      const habit = state.data?.find((habit: HabitDataSchema) => {
        return habit.id === habitId;
      });

      if (habit) {
        const currValue = habit.value?.find((elem) => elem.day === day);
        if (currValue) {
          currValue.value = value;
        } else {
          habit.value.push({ day, value });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsList.pending, (state) => {
        state.isLoading = true;
        // state.error = null;
      })
      .addCase(fetchHabitsList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.isLoading = false;
          state.data = payload;
          // state.error = null;
        }
      })
      .addCase(fetchHabitsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error Occured";
      });
  },
});

export const { addHabit, updateValue } = habitSlice.actions;

export default habitSlice.reducer;
