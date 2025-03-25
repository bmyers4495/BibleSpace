<script lang="ts">

</script>

<div class="login">
  <form {onsubmit}>
    <h1>Login</h1>
    <label>
      Username:
      <input type="text" name="username" required>
    </label>
    <label>
      Password:
      <input type="password" name="password" required>
    </label>
    <div class="remember-me">
      <label for="stayLoggedIn">Remember Me</label>
      <input type="checkbox" name="stayLoggedIn" id="stayLoggedIn">
    </div>
    <button type="submit">Login</button>
  </form>
</div>
<style>

  h1{
    padding-bottom:0.5rem;
  }
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

  }
  .remember-me {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  #stayLoggedIn {
    margin-left: 10px;
    background-color: white;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    padding: 3rem 6rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    font-size: 1.2rem;
    color: #222;
  }


  label {
    margin-bottom: 10px;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
  }
  button:hover {
    background-color: #0056b3;
    color: white;
  }
  input{
    background-color: #fff;
    color: #222;
  }
</style>
