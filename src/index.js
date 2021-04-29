const numButtons = document.querySelectorAll(".numberButton");
const operatorButtons = document.querySelectorAll(".operatorButton");
const mainDisplay = document.querySelector("#mainDisplay");
const secondaryDisplay = document.querySelector("#secondaryDisplay");
const clearButton = document.querySelector(".clearButton");
const deleteButton = document.querySelector(".backspaceButton");
const equalButton = document.querySelector(".equalButton");

class Calculator {
	constructor(secondaryDisplay, mainDisplay) {
		this.previousNumber = secondaryDisplay.innerHTML;
		this.currentNumber = mainDisplay.innerHTML;
	}

	OperationSelected(operation) {
		//If when operator is clicked, there is a previous number and currentNumber, do compute instead.
		if (this.currentNumber !== "" && this.previousNumber !== "") {
			this.Compute();
			//If previous number does not exist, overwrite previous with current, and set current to empty for a new number
		} else if (this.currentNumber !== "" && this.previousNumber === "") {
			this.previousNumber = this.currentNumber;
			this.currentNumber = "";
			this.displayHandler();
		} else {
			//if there is no current input number and operatorbuttons is clicked, overwrite oprator and send to display;
			this.displayHandler();
		}
		this.operation = operation;
	}

	Compute() {
		let Sum;
		let storedNumber = parseFloat(this.previousNumber);
		let newNumber = parseFloat(this.currentNumber);
		let operation = this.operation;

		console.log(storedNumber, typeof newNumber, operation);
		if (isNaN(storedNumber) || isNaN(newNumber)) {
			alert("You need to enter two numbers");
			this.Clear();
		}
		//prevent crashing if operator is not chosen before hitting equal button
		if (operation === "") {
			return;
		}
		switch (operation) {
			case "+":
				Sum = storedNumber + newNumber;
				break;

			case "-":
				Sum = storedNumber - newNumber;
				break;

			case "×":
				Sum = storedNumber * newNumber;
				break;

			case "÷":
				Sum = storedNumber / newNumber;
				break;

			default:
				break;
		}
		this.operation = "";
		this.previousNumber = Sum;
		this.currentNumber = "";
		this.displayHandler();

		console.log(Sum);
	}

	Delete() {
		this.currentNumber = this.currentNumber.slice(0, -1);
		this.displayHandler();
	}

	Clear() {
		this.previousNumber = "";
		this.currentNumber = "";
		this.operation = "";
		this.displayHandler();
	}

	appendNumber(number) {
		if (number === "." && this.currentNumber.includes(".")) {
			return;
		}
		this.currentNumber += number.toString();
		this.newNumber = this.currentNumber;
	}

	displayHandler() {
		//take the number of decimal places you want, multiply the floating point value by 10 raised to the power of that number, and then round.
		//For example, if you want to round 0.507 to 1 decimal place, you multiply by 10 to get 5.07, round to get 5, then divide by 10 to get 0.5.

		mainDisplay.innerText = Math.round(this.currentNumber * 10000) / 10000;

		secondaryDisplay.innerText = `${
			Math.round(this.previousNumber * 10000) / 10000
		}${this.operation}`;
	}
}

const calculator = new Calculator(secondaryDisplay, mainDisplay);

numButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.value);
		calculator.displayHandler();
	});
});

operatorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.OperationSelected(button.value);
	});
});

clearButton.addEventListener("click", () => {
	calculator.Clear();
});

deleteButton.addEventListener("click", () => {
	calculator.Delete();
});

equalButton.addEventListener("click", () => {
	calculator.Compute();
});
