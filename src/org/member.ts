import { v7 as uuid } from "uuid";

export interface FlatMember {
    name: string;
    id: string;
    reports: string[];
}

class Member {
    private name: string;
    private id: string;
    private reports: string[];

    constructor(name: string, id?: string, reports?: string[]) {
        this.name = name;
        this.id = id ?? uuid();
        this.reports = reports ?? [];
    }

    public flatten(): string {
        return JSON.stringify(this);
    }

    public static inflate(flat: string): Member {
        const flatObject: FlatMember = JSON.parse(flat);
        // TODO: implement null/empty checking
        return new Member(flatObject.name, flatObject.id, flatObject.reports)
    }

    public getReports(): string[] {
        return this.reports;
    }

    public addReport(report: Member) : boolean {
        if (this.reports.find(id => id === report.id)) {
            return true;
        }
        this.reports.push(report.id);
        return true;
    }

    public removeReport(reportId: string) : string | undefined {
        const foundIndex = this.reports.findIndex(id => id === reportId);
        if (foundIndex === -1) {
            return undefined;
        }
        return this.reports.splice(foundIndex, 1)[0];
    }

    public getName() : string {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }
}

export default Member;