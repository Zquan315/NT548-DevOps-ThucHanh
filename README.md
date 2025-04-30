# NT548.P21 - Thực hành Công nghệ DevOps và ứng dụng
## Hướng dẫn cách chạy mã nguồn
> Bởi vì các trong các module không có file `.tfvars` vì thế khi chạy cần phải nhập giá trị từng biến nếu muốn chạy từng module. Tuy nhiên, ở bài lab này, nhóm đã tách folder `module` riêng với folder `Lab01` dể có thể phục vụ cho nhiều bài lab khác. Vì thế để chỉ cần 1 câu lệnh là có thể khởi tạo toàn bộ hệ thống gồm 5 module.
- Cấu hình aws, để có thể kết nối tới aws

  ```cli
  aws configure
  ```
  
- Ở đường dẫn `.`, đầu tiên phải vào thư mục `Lab01`
  
  ```bash
  cd Lab01/
  ```
- Chạy lệnh Khởi tạo, nhưng đầu tiên phải tải terraform trước nhé, sau khi tải chạy lệnh ` terraform --version`, nếu hiển thị version coi như thành công

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