var modalContainer = document.getElementById("contact_modal");
// Form  Inputs
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var favoriteInput = document.getElementById("favorite");
var emergencyInput = document.getElementById("emergency");
var createContactBtn = document.getElementById("createContactBtn");
var updateContactBtn = document.getElementById("updateContactBtn");
var contactList = [];
var updateContactIndex = null;

var contactContainer = document.getElementById("contact_cards");
var favoriteItem = document.getElementById("favorite_item");
var emergencyItem = document.getElementById("emergency_item");

if (localStorage.getItem("contactList") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactList"));
  displayContact();
} else {
  contactList = [];
  displayContact();
}

// Open Contact Modal
function openModal() {
  modalContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
}
// Close Contact Modal
function closeModal() {
  modalContainer.style.display = "none";
  document.body.style.overflow = "scroll";
  clearInputsForm();
}

function clearInputsForm() {
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactNotes.value = "";
  favoriteInput.checked = false;
  emergencyInput.checked = false;
}

function validationForm() {
  var phonePattern = /^(\+20|0020|20)?01[0125][0-9]{8}$/;
  var phone = contactPhone.value.trim();
  var name = contactName.value.trim();

  if (name.length == 0) {
    Swal.fire({
      title: "Missing Name",
      text: "Please enter a name for the contact!",
      icon: "error",
    });
    return false;
  }

  if (name.length < 2) {
    Swal.fire({
      title: "Invalid Name!",
      text: "Please enter a valid Name",
      icon: "error",
    });
    return false;
  }

  if (phone.length == 0) {
    Swal.fire({
      title: "Missing Phone",
      text: "Please enter a Phone for the contact!",
      icon: "error",
    });
    return false;
  }

  if (!phonePattern.test(phone)) {
    Swal.fire({
      title: "Invalid Phone!",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
      icon: "error",
    });
    return false;
  }

  return true;
}
// get Value From Inputs And save It in localStorage
function createContact() {
  updateContactBtn.classList.add("hidden");
  if (validationForm() === true) {
    var contactObject = {
      name: contactName.value,
      phone: contactPhone.value,
      email: contactEmail.value,
      address: contactAddress.value,
      group: contactGroup.value,
      notes: contactNotes.value,
      favorite: favoriteInput.checked,
      emergency: emergencyInput.checked,
    };
    contactList.push(contactObject);
    localStorage.setItem("contactList", JSON.stringify(contactList));
    closeModal();
    displayContact();
    clearInputsForm();
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
    });
  }
}


function displayContact() {
  var box = "";

  if (contactList.length == 0) {
    box = `<div class="no_contact">
                  <div class="icon">
                    <span class="fa-solid fa-address-book"></span>
                  </div>
                  <h3>No contacts found</h3>
                  <p>Click "Add Contact" to get started</p>
                </div>`;
  }

  for (let i = 0; i < contactList.length; i++) {
    box += `
              <div class="contact_card">
                  <div class="contact_content">
                    <div class="user_info">
                      <div class="icon">
                        <span>${getFirstCharFromName(i, contactList)}</span>
                        ${
                          contactList[i].favorite
                            ? `<span class="favorite_icon">
                                    <i class="fa-solid fa-star"></i>
                                </span>`
                            : ""
                        }
                        ${
                          contactList[i].emergency
                            ? `  <span class="emergency_icon">
                                    <i class="fa-solid fa-heart-pulse"></i>
                                  </span>`
                            : ""
                        }
                       
                      </div>
                      <div>
                        <h4>${contactList[i].name}</h4>
                        <div class="phone_number">
                          <span class="icon_phone">
                            <i class="fa-solid fa-phone"></i>
                          </span>
                          <span class="phone">${contactList[i].phone}</span>
                        </div>
                      </div>
                    </div>
                    <div class="email_box">
                      
                      ${
                        contactList[i].email
                          ? `<span>
                        <i class="fa-solid fa-envelope"></i>
                      </span>`
                          : ""
                      }
                      <p>${contactList[i].email}</p>
                    </div>
                    <div class="location_box">
                       
                      ${
                        contactList[i].address
                          ? `<span>
                        <i class="fa-solid fa-location-dot"></i>
                      </span>`
                          : ""
                      }
                      <p>${contactList[i].address}</p>
                    </div>
                    <div class="budges">
                      <div class="budge budge_${contactList[i].group}">${
      contactList[i].group
    }</div>
                        ${
                          contactList[i].emergency
                            ? `  <div class="budge budge_emergency">
                                            <span class="fa-solid fa-heart-pulse"></span>
                                            <span>Emergency</span>
                                          </div>`
                            : ""
                        }
                    </div>
                  </div>
                  <div class="card_footer">
                    <div class="call_icons">
                      <a href="tel:${
                        contactList[i].phone
                      }" class="phone" title="call">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                      ${
                        contactList[i].email
                          ? `  <a href="mailto:${contactList[i].email}" class="envelope" title="email">
                        <i class="fa-solid fa-envelope"></i>
                      </a>`
                          : ""
                      }
                    
                    </div>

                    <div class="action_icons">
                      <button onclick='toggleFavoriteValue(${i})'  class="favorite ${
      contactList[i].favorite ? "checked" : ""
    }">
                        <span class="fa-${
                          contactList[i].favorite ? "solid" : "regular"
                        }
                       fa-star"></span>
                      </button>
                      <button onclick='toggleEmergencyValue(${i})'   class="emergency ${
      contactList[i].emergency ? "checked" : ""
    }">
                        <span class="${
                          contactList[i].emergency
                            ? "fa-solid fa-heart-pulse"
                            : "fa-regular fa-heart"
                        } "></span>
                      </button>
                      <button class="edit" onclick='setValuesForUpdateContact(${i})'>
                        <span class="fa-solid fa-pen"></span>
                      </button>
                      <button class="delete" onclick='deleteContact(${i})'  >
                        <span class="fa-solid fa-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
     `;
  }

  contactContainer.innerHTML = box;

  displayFavoriteContact();
  displayEmergencyContact();
  showNumbers();
}

// Show Favorite Contacts
function displayFavoriteContact() {
  var box = "";
  var favoriteList = [];
  if (contactList.length == 0) {
    box = `
            <div class="no_cards">
              <p>No favorites yet</p>
            </div>
              `;
  }

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].favorite == true) {
      favoriteList.push(contactList[i]);
    }
  }

  if (favoriteList.length > 0) {
    for (let i = 0; i < favoriteList.length; i++) {
      box += `
                      <div class="item">
                          <div class="icon">
                            <span>${getFirstCharFromName(
                              i,
                              favoriteList
                            )}</span>
                          </div>
                          <div class="contact_text">
                            <h3>${favoriteList[i].name}</h3>
                            <p>${favoriteList[i].phone}</p>
                          </div>
                          <a href="tel:${
                            favoriteList[i].phone
                          }" class="call_icon">
                            <span class="fa-solid fa-phone"></span>
                          </a>
                        </div>
        `;
    }
  } else {
    box = `
              <div class="no_cards else">
                <p>No favorites yet</p>
              </div>
            `;
  }

  favoriteItem.innerHTML = box;
}
// change favorite  values
function toggleFavoriteValue(index) {
  contactList[index].favorite = !contactList[index].favorite;
  localStorage.setItem("contactList", JSON.stringify(contactList));

  displayContact();
}

// Show Emergency Contacts
function displayEmergencyContact() {
  var box = "";
  var emergencyList = [];
  if (contactList.length == 0) {
    box = `
              <div class="no_cards">
                <p>No emergency contacts</p>
              </div>
            `;
  }

  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].emergency == true) {
      emergencyList.push(contactList[i]);
    }
  }

  if (emergencyList.length > 0) {
    for (var i = 0; i < emergencyList.length; i++) {
      box += `
                    <div class="item">
                        <div class="icon">
                          <span>${getFirstCharFromName(i, emergencyList)}</span>
                        </div>
                        <div class="contact_text">
                          <h3>${emergencyList[i].name}</h3>
                          <p>${emergencyList[i].phone}</p>
                        </div>
                        <a href="tel:${
                          emergencyList[i].phone
                        }" class="call_icon">
                          <span class="fa-solid fa-phone"></span>
                        </a>
                      </div>
      `;
    }
  } else {
    box = `
              <div class="no_cards else">
                <p>No emergency contacts</p>
              </div>
            `;
  }
  emergencyItem.innerHTML = box;
}
// change emergency values
function toggleEmergencyValue(index) {
  contactList[index].emergency = !contactList[index].emergency;

  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayContact();
}

// Show statistic For Contacts
function showNumbers() {
  var status_cards = document.getElementById("status_cards");
  var totalContact = document.getElementById("totalContact");
  var favoriteNumbers = [];
  var emergencyNumbers = [];
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].favorite == true) {
      favoriteNumbers.push(contactList[i]);
    }
    if (contactList[i].emergency == true) {
      emergencyNumbers.push(contactList[i]);
    }
  }

  status_cards.innerHTML = `
  <div class="col-12 col-sm-6 col-md-4">
              <div class="col_card">
                <div class="card_icon users">
                  <span class="fa-solid fa-users"></span>
                </div>
                <div class="card_content">
                  <p>Total</p>
                  <p id="total_number">${contactList.length}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="col_card">
                <div class="card_icon star">
                  <span class="fa-solid fa-star"></span>
                </div>
                <div class="card_content">
                  <p>Favorites</p>
                  <p id="total_number">${favoriteNumbers.length}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="col_card">
                <div class="card_icon heart">
                  <span class="fa-solid fa-heart-pulse"></span>
                </div>
                <div class="card_content">
                  <p>Emergency</p>
                  <p id="total_number">${emergencyNumbers.length}</p>
                </div>
              </div>
            </div>
  `;
  totalContact.innerHTML = `Manage and organize your ${contactList.length} contacts`;
}

// Delete Contact By Index
function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact??",
    text: "Are you sure you want to delete mohammed? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("contactList", JSON.stringify(contactList));
      displayContact();
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
      });
    }
  });
}

// Update Contact By Index
function setValuesForUpdateContact(index) {
  updateContactIndex = index;
  updateContactBtn.classList.remove("hidden");
  createContactBtn.classList.add("hidden");
  openModal();
  contactName.value = contactList[index].name;
  contactPhone.value = contactList[index].phone;
  contactEmail.value = contactList[index].email;
  contactAddress.value = contactList[index].address;
  contactGroup.value = contactList[index].group;
  contactNotes.value = contactList[index].notes;
  favoriteInput.checked = contactList[index].favorite;
  emergencyInput.checked = contactList[index].emergency;
}
function updateContact() {
  if (validationForm() === true) {
    var contactObject = {
      name: contactName.value,
      phone: contactPhone.value,
      email: contactEmail.value,
      address: contactAddress.value,
      group: contactGroup.value,
      notes: contactNotes.value,
      favorite: favoriteInput.checked,
      emergency: emergencyInput.checked,
    };

    contactList.splice(updateContactIndex, 1, contactObject);
    localStorage.setItem("contactList", JSON.stringify(contactList));
    closeModal();
    displayContact();
    Swal.fire({
      title: "Updated!",
      text: "Contact has been updated.",
      icon: "success",
    });
  }
}

// Get Contact Name By Index And Get Array Contain this name
function getFirstCharFromName(index, list) {
  // get first character from name
  var characterName = "";
  var characterNameList = list[index].name.split(" ");

  if (characterNameList.length >= 2) {
    characterName =
      characterNameList[0].split("")[0] + characterNameList[1].split("")[0];
  } else {
    characterName = characterNameList[0].split("")[0];
  }
  return characterName.toLocaleUpperCase();
}

// Search By Name  Or Email Or Phone
function search() {
  var searchInput = document.getElementById("search_input").value.trim();

  var box = "";
  if (contactList.length == 0) {
    box = `<div class="no_contact">
                  <div class="icon">
                    <span class="fa-solid fa-address-book"></span>
                  </div>
                  <h3>No contacts found</h3>
                  <p>Click "Add Contact" to get started</p>
                </div>`;
  }

  for (let i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name.toLowerCase().includes(searchInput.toLowerCase()) ||
      contactList[i].phone.includes(searchInput) ||
      contactList[i].email.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      // Toggle show emergency Budge
      var emergency = "";
      if (contactList[i].emergency) {
        emergency = `  <div class="budge budge_emergency">
                        <span class="fa-solid fa-heart-pulse"></span>
                        <span>Emergency</span>
                      </div>`;
      }

      box += `
              <div class="contact_card">
                  <div class="contact_content">
                    <div class="user_info">
                      <div class="icon">
                        <span>${getFirstCharFromName(i, contactList)}</span>
                      </div>
                      <div>
                        <h4>${contactList[i].name}</h4>
                        <div class="phone_number">
                          <span class="icon_phone">
                            <i class="fa-solid fa-phone"></i>
                          </span>
                          <span class="phone">${contactList[i].phone}</span>
                        </div>
                      </div>
                    </div>
                    <div class="email_box">
                      
                      ${
                        contactList[i].email
                          ? `<span>
                        <i class="fa-solid fa-envelope"></i>
                      </span>`
                          : ""
                      }
                      <p>${contactList[i].email}</p>
                    </div>
                    <div class="location_box">
                       
                      ${
                        contactList[i].address
                          ? `<span>
                        <i class="fa-solid fa-location-dot"></i>
                      </span>`
                          : ""
                      }
                      <p>${contactList[i].address}</p>
                    </div>
                    <div class="budges">
                      <div class="budge budge_${contactList[i].group}">${
        contactList[i].group
      }</div>
                        ${emergency}
                    </div>
                  </div>
                  <div class="card_footer">
                    <div class="call_icons">
                      <a href="tel:${
                        contactList[i].phone
                      }" class="phone" title="call">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                      <a href="mailto:${
                        contactList[i].email
                      }" class="envelope" title="email">
                        <i class="fa-solid fa-envelope"></i>
                      </a>
                    </div>

                    <div class="action_icons">
                      <button onclick='toggleFavoriteValue(${i})'  class="favorite ${
        contactList[i].favorite ? "checked" : ""
      }">
                        <span class="fa-${
                          contactList[i].favorite ? "solid" : "regular"
                        }
                       fa-star"></span>
                      </button>
                      <button onclick='toggleEmergencyValue(${i})'   class="emergency ${
        contactList[i].emergency ? "checked" : ""
      }">
                        <span class="${
                          contactList[i].emergency
                            ? "fa-solid fa-heart-pulse"
                            : "fa-regular fa-heart"
                        } "></span>
                      </button>
                      <button class="edit" onclick='setValuesForUpdateContact(${i})'>
                        <span class="fa-solid fa-pen"></span>
                      </button>
                      <button class="delete" onclick='deleteContact(${i})'  >
                        <span class="fa-solid fa-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
     `;
    }
  }

  contactContainer.innerHTML = box;
}
