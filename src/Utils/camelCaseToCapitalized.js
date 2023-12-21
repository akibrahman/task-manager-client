export const camelCaseToCapitalized = (input) => {
  // Split the input string into words based on uppercase letters
  var words = input.split(/(?=[A-Z])/);

  // Capitalize the first letter of each word
  var capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together to form the capitalized text
  var capitalizedText = capitalizedWords.join(" ");

  return capitalizedText;
};
