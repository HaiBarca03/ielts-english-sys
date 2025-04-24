
import { configureStore } from '@reduxjs/toolkit'
import { programReducer } from './programs/programSlice'
import { contentReducer } from './contents/contentSlide'
import { userReducer } from './users/userSlice'
import { classReducer } from './classes/classSlice'
import { scheduleReducer } from './Schedules/schedulesSlice'
import { attendanceReducer } from './Attendance/attendanceSlice'
import { scoreReducer } from './Score/scoreSlice'
import { paymentReducer } from './Payment/paymentSlice'



const store = configureStore({
  reducer: {
    class : classReducer,
    user : userReducer,
    program: programReducer,
    content : contentReducer,
    schedule : scheduleReducer,
    attendance : attendanceReducer,
    scores: scoreReducer,
    payment :paymentReducer
  }
})

export default store