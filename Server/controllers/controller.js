import Steps from "../models/CarryModel.js";

function generateSteps(num1, num2) {
    let carry = 0;
    let sum = "";
    let carryString = "_"
    let obj = {};
    let i = 1;
    num1 = num1.toString();
    num2 = num2.toString();

    while (num1.length > 0 || num2.length > 0 || carry > 0) {
        let n1 = num1.length > 0 ? parseInt(num1.slice(-1)) : 0;
        let n2 = num2.length > 0 ? parseInt(num2.slice(-1)) : 0;
        let total = n1 + n2 + carry;
        carry = Math.floor(total / 10);
        sum = (total % 10).toString() + sum;
        carryString = carry + carryString;
        obj[`step${i}`] = { carryString, sumString: sum }
        num1 = num1.slice(0, -1);
        num2 = num2.slice(0, -1);
        i++
    }
    return obj
}
const positiveNumberRegex = /^[0-9]+$/;

export const generateStep = async (req, res) => {
    try {

        const { num1, num2 } = req.body;
        if (!positiveNumberRegex.test(num1)) throw new Error("Number 1 not a positive number")
        if (!positiveNumberRegex.test(num1)) throw new Error("Number 2 not positive number")
        const data = generateSteps(num1, num2)
        const result = await Steps.create({ steps: data })
        res.status(200).json({ data: result.steps })
    
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}