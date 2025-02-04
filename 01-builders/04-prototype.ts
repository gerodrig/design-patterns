/**
 * ! Prototype Pattern:

 * It is a creational design pattern that allows us to copy existing objects without making
 * the code dependent on their classes.
 * 
 * * It is useful when we want to duplicate the content, 
 * * the title, and the author of a document, for example, or any complex object.
 * 
 * https://refactoring.guru/design-patterns/prototype
 */

class Document {
  public title: string;
  public content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): Document {
    return new Document(this.title, this.content, this.author);
  }

  displayInformation() {
    console.log(`
            Title: ${this.title}
            Content: ${this.content}
            Author: ${this.author}
            `);
  }
}


function main(){
    const document1 = new Document('Quote', '500 CAD', 'Benito');

    console.log({document1}); 
    document1.displayInformation();

    const document2 = document1.clone();
    document2.title = "New Quote";

    console.log({document2}); 
    document2.displayInformation();
}

main();