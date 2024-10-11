const card = document.getElementById("bottom-card");

// function toggleCard() {
//   if (card.classList.contains("bottom-card-show")) {
//     card.classList.remove("bottom-card-show");
//     card.classList.add("bottom-card-hide");
//   } else {
//     card.classList.remove("bottom-card-hide");
//     card.classList.add("bottom-card-show");
//   }
// }

// setInterval(toggleCard, 2000);

function lazyLoadModel(modelPath) {
  const modelContainer = document.getElementById("model-container");

  if (!modelContainer.hasChildNodes()) {
    const model = document.createElement("a-entity");
    model.setAttribute("gltf-model", modelPath);
    modelContainer.appendChild(model);
  }
}

function getModelFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("model") || "quantum_computer.glb";
}

function getConditionalText(model) {
  let uiText = "Default Model"; // Default text
  switch (model) {
    case "quantum_compuer.glb":
      uiText =
        "A quantum computer uses qubits that can be both 0 and 1 at the same time, unlike normal bits. This lets it solve complex problems faster. Another feature, entanglement, links qubits to work together, making it powerful for tasks like cryptography and simulations.";
      break;
    case "sword.glb":
      uiText = "Welcome to sword";
      break;
    case "model3.glb":
      uiText = "You are viewing Model 3";
      break;
    default:
      uiText = "No model specified!";
  }
  return uiText;
}

window.onload = function () {
  const model = getModelFromQuery();
  console.log(model);
  // const uiText = getConditionalText(model);
  // document.getElementById("ui-text").innerText = uiText;
  const mindarTarget = document.getElementById("target1");

  mindarTarget.addEventListener("targetFound", function () {
    lazyLoadModel(`./models/${model}`);
    card.classList.remove("bottom-card-hide");
    card.classList.add("bottom-card-show");
  });

  mindarTarget.addEventListener("targetLost", function () {
    card.classList.remove("bottom-card-show");
    card.classList.add("bottom-card-hide");
  });
};
