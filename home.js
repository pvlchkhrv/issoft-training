import { userStorageAdapter } from "./storage/adapters/UserAdapter.js";
import { Users } from "./users/Users.js";

const $userInfoBlock = document.querySelector(".userInfo");
$userInfoBlock.innerText = userStorageAdapter.getCurrentUser();

new Users();
