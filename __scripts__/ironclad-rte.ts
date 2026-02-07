import path from 'path';
import fs from 'fs';
import { ZDocument, ZEdit } from './schemas';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';


const getFolders = (folderPath: string): string[] => {
  const allDirEntries = fs.readdirSync(folderPath, { withFileTypes: true });
  const directories: string[] = allDirEntries
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(folderPath, dirent.name));

  return directories;
};

const doAndCheckCommand = async (folderPath: string) => {

  const beforeJson = await import(path.resolve(folderPath, 'before.json'));
  const editJson = await import(path.resolve(folderPath, 'edit.json'));
  const resultJson = await import(path.resolve(folderPath, 'result.json'));

  const before = ZDocument.parse(beforeJson);
  const edit = ZEdit.parse(editJson);
  const result = ZDocument.parse(resultJson);

  let selectionBeginIndex = 0;
  let currentTextNodeIndex = 0;
  let textNodeBeginIndex = 0;

  // first get to the right positon
  while (selectionBeginIndex <= edit.selection.startIndex) {
    const originalTextLength = before.content[currentTextNodeIndex].text.length;

    // if the startIndex from the edit command minus the current selectionBeginIndex is > originalTextLength,
    // we can move to the next text node
    const needToMoveThisManyCharacters = edit.selection.startIndex - selectionBeginIndex;
    if (needToMoveThisManyCharacters > originalTextLength) {
      currentTextNodeIndex++; // move to the next text node
      selectionBeginIndex = selectionBeginIndex + originalTextLength; // set the selectionBeginIndex
      continue;
    }

    if (needToMoveThisManyCharacters <= originalTextLength) {
      textNodeBeginIndex = needToMoveThisManyCharacters;
      selectionBeginIndex = selectionBeginIndex + needToMoveThisManyCharacters;
      break;
    }
  }

  const after = cloneDeep(before);
  // replace the current text at the right position
  const currentText = after.content[currentTextNodeIndex].text;
  after.content[currentTextNodeIndex].text = currentText.slice(0, textNodeBeginIndex) +
    edit.replacement + currentText.slice(textNodeBeginIndex);

  // remove any characters
  if (edit.selection.length > 0) {
    let numberOfCharactersToRemove = edit.selection.length;
    let currentTextNodeRemoveIndex = textNodeBeginIndex + edit.replacement.length;


    while (numberOfCharactersToRemove > 0) {

      const currentText = after.content[currentTextNodeIndex].text;
      const numberOfCharactersAfterCurrentRemoveIndex = currentText.length - currentTextNodeRemoveIndex;

      if (numberOfCharactersToRemove > numberOfCharactersAfterCurrentRemoveIndex) {
        // get all characters after the currentTextNodeRemoveIndex
        const charactersToRemove = currentText.slice(currentTextNodeRemoveIndex);
        after.content[currentTextNodeIndex].text = currentText.slice(0, currentText.length - charactersToRemove.length);
        currentTextNodeIndex++; // move to the next node
        numberOfCharactersToRemove = numberOfCharactersToRemove - charactersToRemove.length;
        currentTextNodeRemoveIndex = 0;
        continue;
      }

      if (numberOfCharactersToRemove <= numberOfCharactersAfterCurrentRemoveIndex) {
        // remove first numberOfCharactersToRemove from currentText

        const textPre = currentText.slice(0, currentTextNodeRemoveIndex);
        const textPost = currentText.slice(currentTextNodeRemoveIndex + numberOfCharactersToRemove);

        after.content[currentTextNodeIndex].text = textPre + textPost;
        break;
      }
    }
  }

  const newAfterContent = after.content.filter(({ text }) => { return !!text; });
  after.content = newAfterContent;

  console.log(`------------------------------------------ ${folderPath}`);

  console.log('*************** areEqual, ', isEqual(after, result));

  console.log('************* before, ', before);
  console.log('************* edit, ', edit);
  console.log('************* after, ', after);
  console.log('************* result, ', result);


};

(async () => {

  const args = process.argv;
  const folderPath = args[args.length - 1]; // path is expected to be the last argument

  const folder = path.resolve(process.cwd(), folderPath);

  if (!fs.existsSync(folder)) {
    throw new Error(`Folder ${folder} does not exist`);
  }

  for (const folderPath of getFolders(folder)) {
    await doAndCheckCommand(folderPath);
  }

})();
