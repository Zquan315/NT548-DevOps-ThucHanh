# NT548.P21 - Thực hành Công nghệ DevOps và ứng dụng

## Lab 01

### Hướng dẫn cách chạy mã nguồn với terraform

> Bởi vì các trong các module không có file `.tfvars` vì thế khi chạy cần phải nhập giá trị từng biến nếu muốn chạy từng module. Tuy nhiên, ở bài lab này, nhóm đã tách folder `module` riêng với folder `Lab01` dể có thể phục vụ cho nhiều bài lab khác. Vì thế để chỉ cần 1 câu lệnh là có thể khởi tạo toàn bộ hệ thống gồm 5 module.

- Cấu hình aws, để có thể kết nối tới aws

  ```cli
  aws configure
  ```

- Ở đường dẫn `.`, đầu tiên phải vào thư mục `Lab01`

  ```bash
  cd Lab01/
  ```

- Chạy lệnh Khởi tạo, nhưng đầu tiên phải tải terraform trước nhé, sau khi tải chạy lệnh `terraform --version`, nếu hiển thị version coi như thành công

  ```cli
  terraform init
  ```

- Sau khi chạy lệnh sẽ có các file được tạo ra, sau đó chạy lệnh dưới để xem các tài nguyên nào sẽ được tạo ra

  ```cli
  terraform plan
  ```

- Tiếp theo, áp dụng cấu hình bằng lệnh dươi, sau đó vào aws xem và kiểm tra các tài nguyên đã được tạo ra đúng như mong đợi hay không

  ```cli
  terraform apply
  ```

- Cuối cùng, xoá các tài nguyên đã tạo bằng lệnh. Các tài nguyên sẽ được xoá sạch mà không sợ sót dẫn đến mất tiền

  ```bash
  terraform destroy
  ```

  > Trong file `provider.tf` nếu như sài tài khoản root thì giá trị `profile_value = ""`, còn nếu sử dụng bằng user nào thì giá trị tương ứng nằm trong file `"C:\Users\<User>\.aws\credentials"`

### Hướng dẫn chạy mã nguồn với AWS CloudFormation

1. Chỉnh sửa IP

- Mở file `main.yml` và `security-groups.yml`, thay giá trị của MyIp bằng địa chỉ IP public của máy cá nhân.

2. Cập nhật Key Pair

- Trong `file main.yml`, thay giá trị KeyName bằng tên của key pair bạn đã tạo trên AWS EC2.

3. Chuẩn bị bucket S3

- Tạo một bucket S3 (ví dụ: nhom16-bucket).
- Upload tất cả các file YAML (trừ file `main.yml`) vào bucket.
- Lấy các URL của các file YAML này để sử dụng trong main.yml (dưới dạng đường dẫn tham chiếu template).

4. Tạo Stack trên CloudFormation

- Mở AWS CloudFormation.
- Chọn "Create Stack" > "With new resources (standard)".
- Tải lên file `main.yml` đã chỉnh sửa.
- Tiến hành tạo stack.

5. Hoàn thành

- Khi stack được tạo thành công, quá trình triển khai đã hoàn tất.

## Lab 02
### Câu 1:

Không có chạy code nên toàn bộ quá trình em để ở trong file báo cáo

### Câu 2

1. Chạy tương tự như ở Lab 1

2. Chạy bash stack tạo infra

``` bash
aws cloudformation create-stack --stack-name nhom16-stack --template-body file://main.yml --capabilities CAPABILITY_NAMED_IAM --region us-east-1
```

3. Tạo codecommit repo, tạo HTTPS Git credentials for AWS CodeCommit để chứa code

``` bash
aws codecommit create-repository --repository-name nhom16-repo
```

> Repo bao gồm file buildspec.yml vào codebuild

4. Push toàn bộ file cloudformation lên repo với credentials vừa tạo

5. Chạy bash stack deploy với file cloudformation codepipeline.yml với các tham số cần thiết

``` bash
aws cloudformation deploy --template-file codepipeline.yml --stack-name nhom16-pipeline --parameter-overrides ArtifactBucket=nhom16-bucket CodeCommitRepoName=nhom16-repo --capabilities CAPABILITY_NAMED_IAM
```

6. Hoàn tất quá trình tạo stack và kiểm tra trên aws codepipeline

### Câu 3

- Toàn bộ quá trình được viết chúng em để trong file báo cáo
- Code ở nhánh Jenkins
