import { FirebaseApp } from "firebase/app";
import { deleteField, doc, Firestore, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

export class Database {
  private db: Firestore

  constructor(app: FirebaseApp) {
    this.db = getFirestore(app);
  }

  public static async createNewUserDocs(app: FirebaseApp, userId: string) {
    const db = getFirestore(app);
    await setDoc(doc(db, userId, "shared"), {});
    await setDoc(doc(db, userId, "nonshared"), {});
    await setDoc(doc(db, userId, "metadata"), {'increment': 1});
  }

  public async getMetadata(userId: string, key?: string) {
    const result = await getDoc(doc(this.db, userId, "metadata"));
    const data = result.data()!;

    if(key != undefined) {
      return data[key];
    }

    return data;
  }

  public setMetadata(userId: string, key: string, value: any) {
    updateDoc(doc(this.db, userId, "metadata"), {
      [key]: value
    });
  }

  public async getSharedResume(userId: string, resumeId: string): Promise<Resume | null> {
    const result = await getDoc(doc(this.db, userId, "shared"));
    const data = result.data();

    if(data == undefined || data[resumeId] == undefined) {
      return null;
    }

    await updateDoc(doc(this.db, userId, "shared"), {
      [`${resumeId}.views`]: data[resumeId]['views'] + 1
    });

    return {
      id: parseInt(resumeId),
      shared: true,
      views: data[resumeId]['views'],
      name: data[resumeId]['name'],
      data: data[resumeId]['data'],
      created: data[resumeId]['created'],
      updated: data[resumeId]['updated'],
      template: data[resumeId]['template']
    }
  }

  public async getResumes(userId: string): Promise<Resume[]> {
    const shared = await getDoc(doc(this.db, userId, "shared"));
    const nonshared = await getDoc(doc(this.db, userId, "nonshared"));

    const data1 = nonshared.data()!;
    const r1 = Object.keys(data1).map(key => {
      return {
        id: parseInt(key),
        shared: false,
        views: data1[key]['views'],
        name: data1[key]['name'],
        data: data1[key]['data'],
        created: data1[key]['created'],
        updated: data1[key]['updated'],
        template: data1[key]['template']
      }
    });

    const data2 = shared.data()!;
    const r2 = Object.keys(data2).map(key => {
      return {
        id: parseInt(key),
        shared: true,
        views: data2[key]['views'],
        name: data2[key]['name'],
        data: data2[key]['data'],
        created: data2[key]['created'],
        updated: data2[key]['updated'],
        template: data2[key]['template']
      }
    });



    return [...r1, ...r2];
  }

  public async uploadResume(userId: string, resume: Resume) {
    await updateDoc(doc(this.db, userId, resume.shared ? "shared" : "nonshared"), {
      [resume.id]: {
        name: resume.name,
        views: resume.views,
        data: resume.data,
        created: resume.created,
        updated: resume.updated,
        template: resume.template
      }
    });
  }

  public async deleteResume(userId: string, resume: Resume) {
    await updateDoc(doc(this.db, userId, resume.shared ? "shared" : "nonshared"), {
      [resume.id]: deleteField()
    });
  }

  public async setShared(userId: string, resume: Resume) {

    // Put the current resume in the shared document
    await updateDoc(doc(this.db, userId, "shared"), {
      [resume.id]: {
        name: resume.name,
        views: resume.views,
        data: resume.data,
        created: resume.created,
        updated: resume.updated,
        template: resume.template
      }
    });

    // And then delete it from the nonshared document
    await updateDoc(doc(this.db, userId, "nonshared"), {
      [resume.id]: deleteField()
    });

    const link = `/shared/${userId}/${resume.id}`;
    return link;
  }

  public async setNonshared(userId: string, resume: Resume) {

    // Put the current resume in the nonshared document
    await updateDoc(doc(this.db, userId, "nonshared"), {
      [resume.id]: {
        name: resume.name,
        views: resume.views,
        data: resume.data,
        created: resume.created,
        updated: resume.updated,
        template: resume.template
      }
    });

    // And then delete it from the shared document
    await updateDoc(doc(this.db, userId, "shared"), {
      [resume.id]: deleteField()
    });
  }
}