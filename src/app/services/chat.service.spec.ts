import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import {WebSocketService} from './web-socket.service';
import {RouterStub} from '../container/container.component.spec';
import {Router} from '@angular/router';
import {Table} from '../classes/table';
import {DeleteCandidateTable} from '../classes/delete-candidate-table';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        WebSocketService,
        {
          provide: Router, useClass: RouterStub
        }
      ]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));

  it('should test _get_tables()', inject([ChatService], (service: ChatService) => {
    expect(service._get_tables.length).toBe(0);
  }));

  it('should test _set_tables()', inject([ChatService], (service: ChatService) => {

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    service._set_tables = [t];

    expect(service._get_tables.length).toBe(1);
  }));

  it('should test _get_removalCandidates()', inject([ChatService], (service: ChatService) => {

    expect(service._get_removalCandidates.length).toBe(0);
  }));

  it('should test _set_removalCandidates()', inject([ChatService], (service: ChatService) => {

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    const tt = new DeleteCandidateTable();

    tt.id = 1;
    tt.position = 1;
    tt.table = t;

    service._set_removalCandidates = [tt];

    expect(service._get_removalCandidates.length).toBe(1);
  }));


  it('should test tableList()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;


    service.tableList([t]);

    expect(service._get_tables.length).toBe(1);

  }));


  it('should test tableList()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;


    service.tableList([t]);

    expect(service._get_tables.length).toBe(1);

  }));


  it('should test removalFailed()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);
    expect(service._get_removalCandidates.length).toBe(0);

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    const tt = new DeleteCandidateTable();

    tt.id = 1;
    tt.position = 1;
    tt.table = t;

    service._set_removalCandidates = [tt];

    expect(service._get_removalCandidates.length).toBe(1);

    service.removalFailed(1);

    expect(service._get_tables.length).toBe(2);


  }));


  it('should test removeFromRemovalCandidates()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);
    expect(service._get_removalCandidates.length).toBe(0);

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    const tt = new DeleteCandidateTable();

    tt.id = 10;
    tt.position = 1;
    tt.table = t;

    service._set_removalCandidates = [tt];

    expect(service._get_removalCandidates.length).toBe(1);

    service.removeFromRemovalCandidates(10);
    expect(service._get_removalCandidates.length).toBe(0);


  }));


  it('should test addToRemovalCandidates()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);
    expect(service._get_removalCandidates.length).toBe(0);

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    service._set_tables = [t];
    expect(service._get_tables.length).toBe(1);

    service.addToRemovalCandidates(1);
    expect(service._get_removalCandidates.length).toBe(1);

  }));


  it('should test tableUpdate()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    service._set_tables = [t];
    expect(service._get_tables.length).toBe(1);

    t.name = 'test 2';
    t.participants = 6;

    service.tableUpdate(t);
    const tab = service._get_tables.find(tables => tables.id === 1);

    expect(tab.name).toBe('test 2');
    expect(tab.participants).toBe(6);

  }));


  it('should test removeFromTableList()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    service._set_tables = [t];
    expect(service._get_tables.length).toBe(1);

    service.removeFromTableList(1);

    expect(service._get_tables.length).toBe(0);


  }));


  it('should test tableAdded()', inject([ChatService], (service: ChatService) => {


    expect(service._get_tables.length).toBe(0);

    const t1 = new Table();

    t1.id = 1;
    t1.name = 'test 1';
    t1.participants = 1;

    const t2 = new Table();

    t2.id = 2;
    t2.name = 'test 2';
    t2.participants = 2;


    const t3 = new Table();

    t3.id = 3;
    t3.name = 'test 3';
    t3.participants = 3;


    service._set_tables = [t2];

    service.tableAdded(t1, -1);

    const ttt = service._get_tables[0];

    expect(ttt.id).toBe(1);
    expect(ttt.name).toBe('test 1');
    expect(ttt.participants).toBe(1);


    service.tableAdded(t3, 1);


    const _t = service._get_tables[1];

    expect(_t.id).toBe(3);
    expect(_t.name).toBe('test 3');
    expect(_t.participants).toBe(3);

  }));
});
