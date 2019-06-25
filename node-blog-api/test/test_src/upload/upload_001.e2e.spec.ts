import * as request from 'supertest';
import { UploadModule } from '../../../src/modules/upload.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

describe('UploadController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                UploadModule
            ]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/POST /api/upload/image 201', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/image')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.png')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.txt')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.png')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201 file-type:mp3', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.mp3')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201 file-type:mp4', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.mp4')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201 file-type:docx', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.docx')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201 file-type:doc', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.doc')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201 file-type:md', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.md')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files?parentId=5c0f3e2b25349c1270e732ec 201', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files?parentId=5c0f3e2b25349c1270e732ec')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.txt')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
