export const generateUniqueName = () => {
  const adjectives = ['ancient', 'whispering', 'hidden', 'emerald', 'occult', 'obscure', 'wandering', 'ephemeral', 'eccentric', 'singing']
  const nouns = ['lichen', 'moss', 'shadow', 'stone', 'ghost', 'friend', 'spore', 'fungi', 'mold', 'mountain', 'compost', 'conspirator']

  const randomItem = (array) => array[Math.floor(Math.random() * array.length)]
  return `${randomItem(adjectives)}-${randomItem(nouns)}`
}

export default {
  generateUniqueName
}
