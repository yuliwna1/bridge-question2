/* Edit the function "petMatcher" that matches each pet to other they may get along
with, i.e. they "like" them and don't "dislike" that type of pet. Also make sure
the owners of each pet are in the same city! */

/* Example output:

Carrot the cat, Big Floof the cat and Dwayne the rock can all hang out in
Toronto with Emily, Lyla and Stephanie.

Sherbert the cat and Fudge the dog can all hang out in Vancouver with 
Prisha and Arya.

*/

const petMatcher = petData => {
  //create "pets" and "humans" reusable variables for future convenience

  const pets = petData.pets;
  const humans = petData.humans;

  //create "isCompatible" function that allows us to check if two pets
  //are compatible to each other based on their location and preferences

  const isCompatible = (petLeft, petRight) => {
    //Find location for each pet
    const locationLeft = humans[petLeft.human].location;
    const locationRight = humans[petRight.human].location;

    //If pets have different locations, it means that they are not compatible
    //therefore return "false"
    if (locationLeft !== locationRight) {
      return false;
    }

    //The string format for pet.type and pet.likes and pet.dislikes are different
    //pet.type is "singular" and pet.likes/pet.dislikes are plural
    //Let's use template literals to change the pet.type format so we could compare it later on

    const petLeftType = `${petLeft.type}s`;
    const petRightType = `${petRight.type}s`;

    //Check if each pet's type not included in other pet's "likes"
    //And included in other pet's "dislikes"

    if (petLeft.likes && !petLeft.likes.includes(petRightType)) {
      return false;
    }
    if (petLeft.dislikes && petLeft.dislikes.includes(petRightType)) {
      return false;
    }
    if (petRight.likes && !petRight.likes.includes(petLeftType)) {
      return false;
    }
    if (petRight.dislikes && petRight.dislikes.includes(petLeftType)) {
      return false;
    }

    //if pets are from the same place and one's type is included in another ones likes
    //and not included in dislikes, return "true". They are compatible!
    return true;
  };

  //Let's group pets based on their preferences

  const petPairs = pets.reduce((pairs, petLeft) => {
    pets.forEach(petRight => {
      //First check if it's not the same pet. Also, check if pets are compatible with each other
      if (petLeft !== petRight && isCompatible(petLeft, petRight)) {
        //Check if pairs are not the same. Use "find" method for that
        //For example [Carrot, BigFoot] and [BigFoot, Carrot] are the same pairs with different order
        if (
          !pairs.find(pair => pair.includes(petLeft) && pair.includes(petRight))
        ) {
          pairs.push([petLeft, petRight]);
        }
      }
    });
    return pairs;
  }, []);

  //Return string based on petPairs
  const result = petPairs
    .map(petPair => {
      //return a string with the information about compatible pets
      const petSummary = petPair.map(pet => {
        return ` ${pet.name} the ${pet.type}`;
      });

      //Find pet's location based on the pet's owner.
      //Since we know that pets are already compatible in the "petPair",
      //we can simply check first pet's location.
      const petLocation = humans[petPair[0].human].location;

      const petHumans = petPair.map(pet => {
        return pet.human;
      });

      //Write a string using template literals to return the summary output
      return `${petSummary} can all hang out in ${petLocation} with ${petHumans}.`;
    })
    .join("");

  return result;
};

export default petMatcher;
