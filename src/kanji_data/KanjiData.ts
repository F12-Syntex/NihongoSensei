import termBank1 from './term_bank_1.json';
import termBank2 from './term_bank_2.json';
import termBank3 from './term_bank_3.json';
import termBank4 from './term_bank_4.json';
import termBank5 from './term_bank_5.json';
import termBank6 from './term_bank_6.json';
import termBank7 from './term_bank_7.json';
import termBank8 from './term_bank_8.json';
import termBank9 from './term_bank_9.json';
import termBank10 from './term_bank_10.json';
import termBank11 from './term_bank_11.json';
import termBank12 from './term_bank_12.json';
import termBank13 from './term_bank_13.json';
import termBank14 from './term_bank_14.json';
import termBank15 from './term_bank_15.json';
import termBank16 from './term_bank_16.json';
import termBank17 from './term_bank_17.json';
import termBank18 from './term_bank_18.json';
import termBank19 from './term_bank_19.json';
import termBank20 from './term_bank_20.json';
import termBank21 from './term_bank_21.json';
import termBank22 from './term_bank_22.json';
import termBank23 from './term_bank_23.json';
import termBank24 from './term_bank_24.json';
import termBank25 from './term_bank_25.json';
import termBank26 from './term_bank_26.json';
import termBank27 from './term_bank_27.json';
import termBank28 from './term_bank_28.json';
import termBank29 from './term_bank_29.json';
import termBank30 from './term_bank_30.json';
import termBank31 from './term_bank_31.json';
import termBank32 from './term_bank_32.json';


interface KanjiMetaData {
  readings: Set<string>;
  meanings: Set<string>;
}

class KanjiData {

  private static instance: KanjiData;
  private data: KanjiMetaData[];

  private constructor() {
    this.data = [];
  }

  public static getInstance(): KanjiData {
    if (!KanjiData.instance) {
        KanjiData.instance = new KanjiData();
    }
    return KanjiData.instance;
  }

  public getData(): KanjiMetaData[] {
    return this.data;
  }

  public addData(data: KanjiMetaData): void {
    this.data.push(data);
  }

  public findKanjiByReading(reading: string): KanjiMetaData[] {
    const result: KanjiMetaData[] = [];
    this.data.forEach((element: KanjiMetaData) => {
      if (element.readings.has(reading)) {
        result.push(element);
      }
    });
    return result;
  }
  public async processAll(): Promise<void> {

    if (this.data.length > 0) {
      return;
    }
    console.log('Processing data...' + this.data.length);
    // const arr = [termBank1, termBank2];
    const arr = [termBank1, termBank2, termBank3, termBank4, termBank5, termBank6, termBank7, termBank8, termBank9, termBank10, termBank11, termBank12, termBank13, termBank14, termBank15, termBank16, termBank17, termBank18, termBank19, termBank20, termBank21, termBank22, termBank23, termBank24, termBank25, termBank26, termBank27, termBank28, termBank29, termBank30, termBank31, termBank32];
    for (const termBank of arr) {
      await this.process(termBank);
    }
  }
  
  public async process(termBank: any): Promise<void> {
    try {
      const parsedData = JSON.parse(JSON.stringify(termBank));
      for (const element of parsedData) {
        const kanjiMetaData: KanjiMetaData = { readings: new Set<string>(), meanings: new Set<string>()};
        const values = Object.values(element);
        kanjiMetaData.readings.add(values[0] as string);
        kanjiMetaData.readings.add(values[1] as string);
        kanjiMetaData.readings.add(values[2] as string);
        kanjiMetaData.readings.add(values[3] as string);
  
        const meaningObject: any = values[5]; // Changed index to 5 to match the correct position of the meaning object
        const meanings = Object.values(meaningObject);
  
        meanings.forEach((meaning: any) => {
          kanjiMetaData.meanings.add(meaning as string);
        });
  
        this.addData(kanjiMetaData); // Add the processed data to the data array
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  
}

export default KanjiData;