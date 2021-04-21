const { prefix } = require('../../config.json');

module.exports = {
	name: 'probs',
    alias: ['prob', 'probability'],
	description: 'Probability of Your Roll',
    //cooldown: 6,
	execute(msg, args) {

        //Catches Command calls of the wrong length
        if(args.length < 3 || args.length > 4){
            return msg.channel.send(`Please enter \'${prefix}probs <number of dice> <number of sides on die> <desired outcome> [<, <=, =, >=, >] \'`)
        }

		const numDice = parseFloat(args[0]);//Number of dice rolled
        const numSides = parseFloat(args[1]);//Number of sides per die
        const outcome = parseFloat(args[2]);//Number to check the probability of. EG: What are chances an 11 is rolled from 2d6
        const operand = args[3];//Optional command to check odds for less than or greater than the outcome
        const possibleSols = Math.pow(numSides, numDice);//Total number of possible combinations from the dice rolled

        var maxRoll = parseFloat(numDice * numSides);//The highest potential roll EG: A 12 from 2d6;
        var mid = (maxRoll/2)+(numDice-1);//The most likely number rolled, shifted because each die has to roll at least a 1.

        //Checks for command syntax
        if(numDice < 1){
            return msg.channel.send('Number of Dice has to be 1 or greater.');
        }

        if(numSides < 2){
            return msg.channel.send('A die has to have atleast 2 sides');
        }

        if(outcome < numDice || outcome > numDice*numSides){
            return msg.channel.send('Entered Outcome is outside possible range of dice roll');
        }

        if(operand && (operand !== '<' || operand !== '<=' || operand !== '=' || operand !== '>' || operand !== '>=')) {
            return msg.channel.send('If operand is entered must be =, <, <=, >, or >=')
        }
        
        /*
        //Recursive function found on web. Is not always accurate for some reason
        var total = 0;
        const P = (numDice, numSides, outcome) => {
            if(numDice === 0) {
                if(outcome === 0) {
                    return 1.0;
                }
                else {
                    return 0.0;
                }
            }
            else{
                for(i = outcome - numSides; i < outcome; i++){
                    total += P(numDice-1, numSides, i) / numSides;
                }
                return total;
            }
            
        }*/
        /*
        //Home brewed probabity function. Takes the number of dice rolled, the sides per die, and the outcome of the roll being checked
        var solutions = 0;//Number of solutions that provide the desired outcome
        const prob = (dice, sides, outcome) => { 
            var tempResult = outcome;//Used to determine if a roll has produced an the correct outcome
            //If outcome is greater than mid starts checking from highest potential die rolls. Else starts with lowest potential roll.
            if(outcome > mid){
                //If desired result is reached add 1 to solutions
                if(tempResult === 0 && dice === 0){
                    solutions += 1.0;
                }
                else{
                    //Recursive call to check die rolls. Subtract rolled number from outcome until 0 is reached or all dice are rolled.
                    for(i = sides; i > 0; i--){
                        tempResult -= i;
                        if (tempResult < 0 || dice === 0){
                            break;
                        }
                        
                        prob(dice-1, sides, tempResult);
                    }     
                }
            }
            //Same as above but starting from lowest possible roll
            else{
                if(tempResult === 0 && dice === 0){
                    solutions += 1.0;
                }
                else{
                    for(i = 1; i <= sides; i++){
                        tempResult -= i;
                        if (tempResult <=0 || dice === 0){
                            break;
                        }
                        
                        prob(dice-1, sides, tempResult);
                    }     
                }
            }

            var perc = solutions/possibleSols;//Compute probabilty by dividing matching solution by all possible solutions
            perc = (perc*100).toFixed(2);//Format answer
            return perc;
        }*/
        //Home brewed probabity function. Takes the number of dice rolled, the sides per die, and the outcome of the roll being checked
        var solutions = 0;//Number of solutions that provide the desired outcome
        console.log('\n');
        const prob = (dice, sides, outcome) => { 
            var tempResult = outcome;//Used to determine if a roll has produced an the correct outcome
            //If outcome is greater than mid starts checking from highest potential die rolls. Else starts with lowest potential roll.
            if(tempResult > mid){
                
                //Recursive call to check die rolls. Subtract rolled number from outcome until 0 is reached or all dice are rolled.
                for(i = sides; i > 0; i--){
                    console.log('> ' + dice+', '+ i + ', '+ solutions);
                    //If desired result is reached add 1 to solutions
                    tempResult -= i;
                    if(tempResult === 0 && dice === 0){
                        solutions += 1.0;
                    }
                    else if (tempResult < 0 || dice < 1){
                        break;
                    }
                    else{  
                        prob(dice-1, sides, tempResult);
                    }   
                }              
            }
            //Same as above but starting from lowest possible roll
            else{
                 
                for(i = 1; i <= sides; i++){
                    console.log('< ' + dice + ', '+ i + ', '+ solutions);
                    tempResult -= i;
                    if(tempResult === 0 && dice === 0){
                        solutions += 1.0;
                    }
                    else if (tempResult < 0 || dice < 1){
                        break;
                    }
                    else{
                        prob(dice-1, sides, tempResult);
                    }
                }     
            }
            
            var perc = solutions/possibleSols;//Compute probabilty by dividing matching solution by all possible solutions
            perc = (perc*100).toFixed(2);//Format answer
            return perc;
        }
        
        total = prob((numDice), numSides, outcome);
        
        //prob = total.toFixed(3);
        return msg.channel.send(`The probability is ${total} that you'd get ${outcome} from ${numDice}d${numSides}`);
	},
};