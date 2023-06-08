import { combineReducers } from "redux";
import CustomizerReducer from "./customizer/CustomizerReducer";
import chatReducer from "./chats/ChatReducer";
import notesReducer from "./notes/NotesReducer";
import emailReducer from "./email/EmailReducer";
import userReducer from "./user/userReducer";

const RootReducers = combineReducers({
  CustomizerReducer,
  chatReducer,
  notesReducer,
  emailReducer,
  userReducer,
});

export default RootReducers;
