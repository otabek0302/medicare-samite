@extends('layouts.blank')
@section('content')
    <div class="container center-content mainSection ">
        <div class="card mt-6">
            <div class="card-body">
                <div class="card-header">
                    <div class="row" style="width: 100%">
                        <div class="text-center main-header">
                            <h1>Medicare Software Installation</h1>
                            <h4>Please proceed step by step with proper data according to instructions</h4>
                        </div>
                        <hr>

                        <div class="card-main">
                            <div class="d-flex group-main">
                                <div class="group-out">
                                    <p class="step-name">STEP 2. Database Configuration</p>
                                    <p class="step-subhead">Please provide your database information below.</p>
                                    <div class="group">
                                        <div class="grp-form">
                                            <form class="form-section" method="POST" action="{{ route('activate') }}">
                                                @csrf
                                                <div class="form-group custom-form-group">
                                                    <label class="label-section" for="DB_HOST">Database Host</label>
                                                    <input type="text" class="form-control input-section" id="DB_HOST"
                                                        name="DB_HOST" required placeholder="Ex: localhost">
                                                </div>

                                                <div class="form-group custom-form-group">
                                                    <label class="label-section" for="DB_DATABASE">Database Name</label>
                                                    <input type="text" class="form-control input-section" id="DB_DATABASE"
                                                        name="DB_DATABASE" required placeholder="Ex: medicare_db">
                                                </div>

                                                <div class="form-group custom-form-group">
                                                    <label class="label-section" for="DB_USERNAME">Database Username</label>
                                                    <input type="text" class="form-control input-section" id="DB_USERNAME"
                                                        name="DB_USERNAME" required placeholder="Ex: root">
                                                </div>

                                                <div class="form-group custom-form-group">
                                                    <label class="label-section" for="DB_PASSWORD">Database Password</label>
                                                    <input type="password" class="form-control input-section" id="DB_PASSWORD"
                                                        name="DB_PASSWORD" placeholder="Enter database password">
                                                </div>

                                                <div class="text-center">
                                                    <button type="submit" class="btn btn-primary">Continue</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
