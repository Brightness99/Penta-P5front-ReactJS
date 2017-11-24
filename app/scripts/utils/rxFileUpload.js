// @flow
/**
 * @module API
 * @desc API functions
 */
import { Subject } from 'rxjs/Subject';
import keyMirror from 'fbjs/lib/keyMirror';
import plupload from 'plupload';

type Config = {
  chunkSize: number,
  uploadUrl: string,
}

/**
 * @constant {Object} PluploadConstants
 * @memberof Constants
 */
export const PluploadConstants = keyMirror({
  UPLOAD_PROGRESS: undefined,
  UPLOAD_SUCCESS: undefined,
  UPLOAD_CANCEL: undefined,
  UPLOAD_FAILURE: undefined,
});

export class RxPlupload {
  config: Config;
  uploader;
  subject: Subject = new Subject();
  previews = [];

  constructor(config: Config) {
    this.config = config;
    const fakeId = `fakeContainer${new Date()}`;
    const fakeContainer = document.createElement('div');
    fakeContainer.style.display = 'none';
    fakeContainer.id = fakeId;
    document.body.appendChild(fakeContainer);
    this.uploader = new plupload.Uploader({
      headers: {
        Authorization: 'Basic cHJpbnRpOjIwMTZhbHBoYXByb3RlY3Q=',
      },
      url: 'http://dev-cms.printi.com.br/v2/upload',
      runtimes: 'html5,html4',
      browse_button: fakeId,
      chunk_size: this.config.chunkSize,
      init: {
        UploadProgress: (up, file) => {
          this.subject.next({ type: PluploadConstants.UPLOAD_PROGRESS,
            progress: {
              percent: file.percent,
              name: file.name,
              format: file.name.split('.')[1],
            } });
        },
        FileUploaded: (up, file, result) => {
          if (result.status === 200 && result.response !== '""') {
            this.previews.push(JSON.parse(result.response));
            return;
          }
          this.previews = [];
          this.subject.next({ type: PluploadConstants.UPLOAD_FAILURE, error: result.response });
        },
        UploadComplete: () => {
          if (this.previews.length > 0) { this.subject.next({ type: PluploadConstants.UPLOAD_SUCCESS, response: this.previews }); }
        },
        FilesAdded: () => {
          /* It's needed for adding files from code */
        },
        Error: (up, error) => {
          this.subject.next({ type: PluploadConstants.UPLOAD_FAILURE, error });
        },
      },
    });
    this.uploader.init();
  }

  uploadFile(files: []) {
    this.previews = [];
    files.forEach(x => this.uploader.addFile(x));
    this.uploader.start();
    return this.subject.asObservable();
  }

  cancelUpload() {
    this.previews = [];
    this.uploader.stop();
    this.uploader.splice();
    this.subject.next({ type: PluploadConstants.UPLOAD_CANCEL });
  }
}

