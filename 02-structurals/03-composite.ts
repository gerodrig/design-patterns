/**
 * ! Composite Pattern
 * It is a structural design pattern that allows composing objects
 * into tree structures to represent hierarchies.
 *
 * The pattern allows clients to treat individual objects and their compositions uniformly.
 *
 * * It is useful when you need to treat individual objects
 * * and their compositions uniformly, and the structure
 * * of the objects forms a tree hierarchy.
 *
 * https://refactoring.guru/design-patterns/composite
 *
 */

interface FileSystemComponent {
    showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
    private name: string;

    constructor(name: string){
        this.name = name;
    }

  showDetails(indent?: string): void {
    console.log(`${indent}- File: ${this.name}`);
  }
}

class Folder implements FileSystemComponent{
  private name: string;
  private contents: FileSystemComponent[] = [];

  constructor(name: string){
    this.name = name;
  }

  add(component: FileSystemComponent){
    this.contents.push(component);
  }
  
    showDetails(indent: string = ''): void {
    console.log(`${indent}+ Folder: ${this.name}`)
    this.contents.forEach((component) => component.showDetails(indent + ' '));
  }
}

function main(){
    const file1 = new File('file1.txt');
    const file2 = new File('file2.txt');
    const file3 = new File('file3.txt');
    const file4 = new File('file4.txt');

    const folder1 = new Folder('Folder 1');
    const folder5 = new Folder('Folder 5');

    folder1.add(file1);
    folder1.add(file2);

    const folder2 = new Folder('Folder 2');
    folder2.add(file3);

    const folder3 = new Folder('Folder 3');
    folder3.add(file4);
    folder2.add(folder3);
    folder2.add(folder5);

    const rootFolder = new Folder('ROOT Folder');

    rootFolder.add(folder1);
    rootFolder.add(folder2);


    rootFolder.showDetails();
}



main();