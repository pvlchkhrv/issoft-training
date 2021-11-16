import { Modal } from "./modal/Modal.js";
import { userStorageAdapter } from "./storage/adapters/UserAdapter.js";
import { Users } from "./users/Users.js";

const $userInfoBlock = document.querySelector(".userInfo");
$userInfoBlock.innerText = userStorageAdapter.getCurrentUser();

const $editUserButton = document.querySelector("#edit-user-button");
const $deleteUserButton = document.querySelector("#delete-user-button");

const $editUserForm = document.querySelector("#edit-user-form");
// const modal = new Modal();

// // $editUserButton.addEventListener("click", () => modal.open($editUserForm));

const users = new Users();
