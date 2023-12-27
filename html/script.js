// get element

const macthContainer = document.getElementById("macth-container");

const addMatch = document.getElementById("add-match");
addMatch.addEventListener("click", function () {
  const matchDiv = document.createElement("div");
  matchDiv.classList.add("match");

  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("wrapper");

  wrapperDiv.innerHTML = `
  <button class="lws-delete">
    <img src="./image/delete.svg" alt="" />
  </button>
  <h3 class="lws-matchName">Match 1</h3>
`;
  matchDiv.appendChild(wrapperDiv);
  const counterDiv = document.createElement("div");
  counterDiv.classList.add("inc-dec");
  const incrementForm = document.createElement("form");
  incrementForm.classList.add("incrementForm", "fuad-from");
  incrementForm.innerHTML = `
  <h4>Increment</h4>
  <input type="number" name="increment" class="lws-increment" />
  `;
  counterDiv.appendChild(incrementForm);
  const decrementForm = document.createElement("form");
  decrementForm.classList.add("decrementForm", "fuad-from");
  decrementForm.innerHTML = `
  <h4>Decrement</h4>
  <input type="number" name="decrement" class="lws-decrement" />

  `;

  counterDiv.appendChild(decrementForm);

  matchDiv.appendChild(counterDiv);

  const numberDiv = document.createElement("div");
  numberDiv.classList.add("numbers");
  const h2 = document.createElement("h2");
  h2.classList.add("lws-singleResult");
  h2.classList.add("total-result");
  numberDiv.appendChild(h2);
  matchDiv.appendChild(numberDiv);

  console.log("heloo");

  macthContainer.appendChild(matchDiv);
});

const INCREMENT = "increment";
const DECREMENT = "decrement";

// action function

const change = (type, value) => {
  return {
    type: type,
    payload: value,
  };
};

// get element , button ,
const forms = document.querySelectorAll(".fuad-from");

// initial match state
const initialMatchState = {
  value: 0,
};

const matchReducer = (state = initialMatchState, action) => {
  if (action.type === "increment") {
    return {
      ...initialMatchState,
      value: state.value + action.payload,
    };
  } else if (action.type === "decrement") {
    return {
      ...initialMatchState,
      value: state.value - action.payload,
    };
  } else {
    return state;
  }
};

const getNodeList = (key) => {
  const result = document.querySelectorAll(key);
  return result;
};

const store = Redux.createStore(matchReducer);
const render = () => {
  getNodeList(".total-result").forEach(function (total) {
    console.log("he", total);
    const totalNumber = parseFloat(total.innerText);
    state = store.getState();
    if (state.value < 0) {
      state.value = 0;
    }
    total.innerText = state.value;
  });
};

store.subscribe(render);

render();

function matchCalculation(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // get  input
    const inputElement = event.target;
    const inputAction = event.target.name;
    // get number
    const number = parseFloat(inputElement.value);
    store.dispatch(change(inputAction, number));
    inputElement.value = "";
  }
}

forms.forEach(function (form) {
  form.addEventListener("keypress", matchCalculation);
});

const nodeList = document.querySelectorAll(".total-result");
console.log(nodeList);
